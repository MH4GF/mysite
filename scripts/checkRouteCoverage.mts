// ルートカバレッジ検証(SPEC.md ゲート②): app/**/page.tsx から全ルートを機械的に列挙し、
// app/__vrt__/targetPages.ts の TARGET_PAGES に登録されていないルートがあれば CI を fail させる。
// biome-ignore lint/correctness/noNodejsModules: Script needs Node.js fs/path to enumerate app router routes
import fs from "node:fs";
// biome-ignore lint/correctness/noNodejsModules: Script needs Node.js fs/path to enumerate app router routes
import path from "node:path";

import type { TargetPage } from "../app/__vrt__/targetPages.js";

const APP_DIR = "app";
const PAGE_FILE_NAME = "page.tsx";

/**
 * ルート除外用 allowlist。
 * 除外が必要な場合はここに理由コメント付きで追加する(ユーザー承認が必要。ゲート①と同様のラチェット運用)。
 * 現状は空。
 */
const ROUTE_ALLOWLIST: string[] = [];

const isDynamicSegment = (segment: string): boolean =>
  segment.startsWith("[") && segment.endsWith("]");

const isRouteGroupSegment = (segment: string): boolean =>
  segment.startsWith("(") && segment.endsWith(")");

/** app/(pages)/thinking-in-career/page.tsx のようなファイルパスを /thinking-in-career のようなルートに変換する */
const filePathToRoute = (filePath: string): string => {
  const relativeToApp = path.relative(APP_DIR, filePath);
  const segments = relativeToApp.split(path.sep).slice(0, -1); // 末尾の page.tsx を除く
  const routeSegments = segments.filter((segment) => !isRouteGroupSegment(segment));
  return `/${routeSegments.join("/")}`;
};

const findPageFiles = (dir: string): string[] => {
  const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name === PAGE_FILE_NAME)
    .map((entry) => path.join(entry.parentPath, entry.name));
};

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** 動的ルート(例: /blog/[slug])を、実パスにマッチする正規表現に変換する */
const routeToRegExp = (route: string): RegExp => {
  const pattern = route
    .split("/")
    .map((segment) => (isDynamicSegment(segment) ? "[^/]+" : escapeRegExp(segment)))
    .join("/");
  return new RegExp(`^${pattern}$`);
};

const isRouteCovered = (route: string, targetPages: TargetPage[]): boolean => {
  const isDynamicRoute = route.split("/").some(isDynamicSegment);
  if (isDynamicRoute) {
    const regExp = routeToRegExp(route);
    return targetPages.some((targetPage) => regExp.test(targetPage.path));
  }
  return targetPages.some((targetPage) => targetPage.path === route);
};

async function main(): Promise<void> {
  // NOTE: 静的importにするとtsxのESM/CJS相互運用の問題でnamed exportを解決できないため、
  // scripts/pagefind.mts の慣習に合わせて動的importを使う
  const { TARGET_PAGES } = await import("../app/__vrt__/targetPages.js");

  const pageFiles = findPageFiles(APP_DIR);
  const routes = [...new Set(pageFiles.map(filePathToRoute))].sort();

  const uncoveredRoutes = routes
    .filter((route) => !ROUTE_ALLOWLIST.includes(route))
    .filter((route) => !isRouteCovered(route, TARGET_PAGES));

  if (uncoveredRoutes.length > 0) {
    console.error("以下のルートが app/__vrt__/targetPages.ts の TARGET_PAGES に未登録です:");
    for (const route of uncoveredRoutes) {
      console.error(`  - ${route}`);
    }
    console.error(
      "\napp/__vrt__/targetPages.ts の TARGET_PAGES にページを追加してください。" +
        "除外が必要な場合は scripts/checkRouteCoverage.mts の ROUTE_ALLOWLIST に理由コメント付きで追加し、ユーザーの承認を得てください。",
    );
    process.exit(1);
  }

  console.log(`ルートカバレッジ検証: OK (${routes.length} ルート中、全てVRT対象に登録済み)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
