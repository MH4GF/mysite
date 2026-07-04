/**
 * コンポーネントVRT（SPEC.md「コンポーネントテスト（Storybook）」「視覚的状態行列」）。
 *
 * - `import.meta.glob` で app 配下の全ストーリーを構造的に取得する（opt-in 不可。
 *   「ストーリーが存在する ⇒ VRT が存在する」を定義上成立させる）
 * - 各ストーリーを composeStories で合成し、ライト / ダーク 2 テーマで play 実行後に
 *   `toMatchScreenshot` で基準画像と比較する
 * - このテストは CI と同一 digest の Playwright コンテナ内でのみ実行する（`pnpm vrt` /
 *   `pnpm vrt:update`）。vitest.config.ts の VRT=1 ゲートにより、ホスト環境の
 *   `pnpm test:vitest` では構成上実行されない（macOS 産スナップショットの混入を排除する）
 */
import { composeStories, setProjectAnnotations } from "@storybook/nextjs-vite";
import { afterEach, beforeAll, expect, test } from "vitest";
import { page } from "vitest/browser";

import * as previewAnnotations from "../../.storybook/preview";

const annotations = setProjectAnnotations([previewAnnotations]);
beforeAll(annotations.beforeAll);

// SPEC.md「VRT の決定性」: 撮影時はアニメーション・トランジション・キャレットを全停止する
beforeAll(() => {
  const style = document.createElement("style");
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      caret-color: transparent !important;
      scroll-behavior: auto !important;
    }
  `;
  document.head.appendChild(style);
});

// ダークモードは documentElement への "dark" クラス付与で切り替わる（app/globals.css）。
// テスト間の状態漏れを防ぐため、テスト後は必ずクリーンアップする
afterEach(() => {
  document.documentElement.classList.remove("dark");
  document.body.replaceChildren();
});

/** composeStories が返す合成済みストーリーのうち、このテストが利用する部分の型 */
interface RunnableStory {
  run: (context?: { canvasElement?: HTMLElement }) => Promise<void>;
}

type StoriesModule = Parameters<typeof composeStories>[0];

// vite/client の型はルートから解決できない（vite は vitest の推移的依存）ため、
// このテストが使う import.meta.glob の型のみをローカルに宣言する
declare global {
  interface ImportMeta {
    glob<T>(pattern: string, options: { eager: true }): Record<string, T>;
  }
}

// app 配下の全ストーリーを機械的に列挙する（このファイルは app/__vrt__/ にあるため "../" = app/）
const storyModules = import.meta.glob<StoriesModule>("../**/*.stories.tsx", { eager: true });

const themes = ["light", "dark"] as const;

/** "../_components/Time.stories.tsx" -> "_components/Time" */
const storyFilePathFor = (modulePath: string): string =>
  modulePath.replace(/^\.\.\//, "").replace(/\.stories\.tsx$/, "");

/** スクリーンショット名: ストーリーID（ファイルパス + export 名）+ テーマで安定・一意にする */
const screenshotNameFor = (storyFilePath: string, exportName: string, theme: string): string => {
  const fileId = storyFilePath
    .replaceAll(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return `${fileId}--${exportName}--${theme}`;
};

for (const [modulePath, storiesModule] of Object.entries(storyModules)) {
  const storyFilePath = storyFilePathFor(modulePath);
  const composed: Record<string, RunnableStory> = composeStories(storiesModule);

  for (const [exportName, story] of Object.entries(composed)) {
    for (const theme of themes) {
      test(`${storyFilePath} > ${exportName} > ${theme}`, async () => {
        document.documentElement.classList.toggle("dark", theme === "dark");

        const canvasElement = document.createElement("div");
        document.body.appendChild(canvasElement);

        // レンダリング + play function 実行（Storybook のライフサイクルフックを全て実行する）
        await story.run({ canvasElement });

        // SPEC.md「VRT の決定性」: フォントのロード完了を待つ
        await document.fonts.ready;

        await expect
          .element(page.elementLocator(canvasElement))
          .toMatchScreenshot(screenshotNameFor(storyFilePath, exportName, theme));
      });
    }
  }
}
