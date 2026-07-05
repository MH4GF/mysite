// ストーリー存在チェック(SPEC.md「コンポーネントテスト（Storybook）」): app 配下の PascalCase
// コンポーネントファイルを機械的に列挙し、対応する <Name>.stories.tsx を持たないものがあれば
// (storyExclusions.ts の allowlist にあるものを除き) CI を fail させる。
// biome-ignore lint/correctness/noNodejsModules: Script needs Node.js fs/path to enumerate component files
import fs from "node:fs";
// biome-ignore lint/correctness/noNodejsModules: Script needs Node.js fs/path to enumerate component files
import path from "node:path";

// tsx 経由でこのファイル(.mts)から拡張子なし/.tsのモジュールを静的importすると、
// package.json に "type": "module" が無い都合で CJS/ESM 相互運用がうまくいかず
// named export が解決できないため、pagefind.mts と同じ動的importの流儀に合わせる
const { storyExclusions } = await import("../storyExclusions.js");

const APP_DIR = "app";

const SKIP_DIR_NAMES = new Set(["__tests__", "__vrt__"]);

const isSkippedPath = (relativePath: string): boolean =>
  relativePath.split(path.sep).some((segment) => SKIP_DIR_NAMES.has(segment));

const isTargetComponentFile = (entry: fs.Dirent): boolean => {
  if (!(entry.isFile() && entry.name.endsWith(".tsx"))) {
    return false;
  }
  if (!/^[A-Z]/.test(entry.name)) {
    return false;
  }
  if (
    entry.name.endsWith(".stories.tsx") ||
    entry.name.endsWith(".test.tsx") ||
    entry.name.endsWith(".e2e.tsx")
  ) {
    return false;
  }
  return true;
};

const findComponentFiles = (dir: string): string[] => {
  const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => isTargetComponentFile(entry))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .map((filePath) => path.relative(".", filePath).split(path.sep).join("/"))
    .filter((relativePath) => !isSkippedPath(relativePath))
    .sort();
};

const storyPathFor = (componentPath: string): string =>
  componentPath.replace(/\.tsx$/, ".stories.tsx");

interface Classification {
  missing: string[];
  staleExclusions: string[];
  danglingExclusions: string[];
}

const classify = (componentFiles: string[], exclusions: readonly string[]): Classification => {
  const exclusionSet = new Set(exclusions);
  const seenExclusions = new Set<string>();
  const missing: string[] = [];
  const staleExclusions: string[] = [];

  for (const componentFile of componentFiles) {
    const hasStory = fs.existsSync(storyPathFor(componentFile));
    const isExcluded = exclusionSet.has(componentFile);
    if (isExcluded) {
      seenExclusions.add(componentFile);
    }

    if (hasStory && isExcluded) {
      staleExclusions.push(componentFile);
    } else if (!(hasStory || isExcluded)) {
      missing.push(componentFile);
    }
  }

  const danglingExclusions = exclusions.filter((entry) => !seenExclusions.has(entry));

  return { missing, staleExclusions, danglingExclusions };
};

const reportList = (title: string, files: string[], footer: string): void => {
  if (files.length === 0) {
    return;
  }
  console.error(title);
  for (const file of files) {
    console.error(`  - ${file}`);
  }
  console.error(footer);
};

const reportViolations = ({
  missing,
  staleExclusions,
  danglingExclusions,
}: Classification): void => {
  reportList(
    "以下のコンポーネントに stories ファイルがありません:",
    missing,
    "\n対応する <Name>.stories.tsx を追加してください。" +
      "正当な理由がある場合のみ storyExclusions.ts への追加をユーザーに提案できますが、承認なしに適用してはいけません。",
  );
  reportList(
    "\n以下は storyExclusions.ts に登録されていますが、既に stories ファイルが存在します(stale エントリ):",
    staleExclusions,
    "\nstoryExclusions.ts は縮む方向にのみ変更してよい allowlist です。該当エントリを削除してください。",
  );
  reportList(
    "\n以下は storyExclusions.ts に登録されていますが、対応するコンポーネントファイルが見つかりません(dangling エントリ):",
    danglingExclusions,
    "\nファイルが削除・移動された場合は storyExclusions.ts からも削除してください。",
  );
};

const main = (): void => {
  const componentFiles = findComponentFiles(APP_DIR);
  const result = classify(componentFiles, storyExclusions);
  const { missing, staleExclusions, danglingExclusions } = result;

  if (missing.length > 0 || staleExclusions.length > 0 || danglingExclusions.length > 0) {
    reportViolations(result);
    process.exit(1);
  }

  console.log(
    `ストーリー存在チェック: OK (${componentFiles.length} 件のコンポーネント中、全てストーリー済みまたは allowlist で明示的に除外済み)`,
  );
};

main();
