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
import { composeStories, composeStory, setProjectAnnotations } from "@storybook/nextjs-vite";
import { afterEach, beforeAll, expect, test } from "vitest";
import { page } from "vitest/browser";

import * as previewAnnotations from "../../.storybook/preview";

const annotations = setProjectAnnotations([previewAnnotations]);
beforeAll(annotations.beforeAll);

// documentElement / body の初期状態。ストーリーの副作用（ColorModeScript のインライン script、
// next/script が body に直接注入する script 等）が残っても afterEach で完全復元するために保持する
let initialHtmlClassName = "";
let initialBodyChildren = new Set<Element>();

// SPEC.md「VRT の決定性」: 撮影環境を固定する
beforeAll(() => {
  initialHtmlClassName = document.documentElement.className;
  initialBodyChildren = new Set(document.body.children);

  const style = document.createElement("style");
  style.textContent = `
    /* アニメーション・トランジション・キャレットを全停止する */
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      caret-color: transparent !important;
      scroll-behavior: auto !important;
    }
    /* スクロールバーの出現有無でビューポート実効幅が揺れると、全要素のレイアウトが
       水平方向にずれて右端 1 列分の非決定差分になる。ガター幅を常に確保して排除する。
       また、撮影対象は documentElement（下記コメント参照）なので、fixed 配置の要素や
       body 直下の portal（Radix の Dialog / Popover / Tooltip 等のオーバーレイ）が
       必ず撮影範囲に入るよう、html の高さを最低 1 ビューポートぶん確保する */
    html {
      scrollbar-gutter: stable;
      min-height: 100vh;
    }
  `;
  document.head.appendChild(style);
});

// 【重要】portable stories の unmount コールバックは「次の story.run() の冒頭」で遅延実行される
// （composeStories 内部のモジュール共有 cleanups 配列）。そのため、afterEach で React 管理下の
// DOM（Radix 等が body 直下に追加する portal を含む）を直接消すと、遅延アンマウント時に React の
// removeChild が NotFoundError を投げ、後続テストが連鎖失敗する。
// そこで、何もレンダリングしない「フラッシュ用ストーリー」の run() を afterEach で呼ぶことで、
// 直前のストーリーのアンマウント（portal 回収・react-remove-scroll 等による body スタイル復元を
// 含む）をテスト内で即時完結させる。これにより body に残った残骸の掃除が安全になる
const flushStory = composeStory({ render: () => <></> }, {});

// 現在のテストが body に追加したストーリー用コンテナ
let activeCanvasElement: HTMLElement | undefined;

afterEach(async () => {
  // 1. 直前のストーリーを即時アンマウントする（フラッシュ用ストーリー自身は detached な
  //    コンテナにマウントされるため body には現れず、その unmount は次の run() 冒頭で回収される）
  await flushStory.run({ canvasElement: document.createElement("div") });

  // 2. ストーリー用コンテナを除去する
  activeCanvasElement?.remove();
  activeCanvasElement = undefined;

  // 3. ストーリーが body に直接注入した React 管理外のノード（next/script が挿入する
  //    script タグ等）を含め、スイート開始時に存在しなかった body 直下の残骸を全て除去する
  for (const node of Array.from(document.body.children)) {
    if (!initialBodyChildren.has(node)) {
      node.remove();
    }
  }

  // 4. ストーリーの副作用が次のテストへ漏れないよう、グローバル状態を完全復元する
  document.documentElement.className = initialHtmlClassName;
  window.localStorage.clear();
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

/**
 * スクリーンショット名: ストーリーのファイルパス / export 名 / テーマの階層構造にする。
 * 例: "_components/Time/Default/dark(-chromium-linux.png)"
 */
const screenshotNameFor = (storyFilePath: string, exportName: string, theme: string): string =>
  `${storyFilePath}/${exportName}/${theme}`;

for (const [modulePath, storiesModule] of Object.entries(storyModules)) {
  const storyFilePath = storyFilePathFor(modulePath);
  const composed: Record<string, RunnableStory> = composeStories(storiesModule);

  for (const [exportName, story] of Object.entries(composed)) {
    for (const theme of themes) {
      test(`${storyFilePath} > ${exportName} > ${theme}`, async () => {
        // テーマ軸: documentElement の dark クラス（app/globals.css の切替点）と
        // localStorage.isDarkMode を一致させて固定する。ColorModeScript のように
        // ストーリー自身がカラーモードを解決するコンポーネントでも、ハーネスの
        // テーマ軸と同じ結論に到達し決定的になる
        window.localStorage.clear();
        window.localStorage.setItem("isDarkMode", theme === "dark" ? "true" : "false");
        document.documentElement.classList.toggle("dark", theme === "dark");

        const canvasElement = document.createElement("div");
        document.body.appendChild(canvasElement);
        activeCanvasElement = canvasElement;

        // レンダリング + play function 実行（Storybook のライフサイクルフックを全て実行する）
        await story.run({ canvasElement });

        // SPEC.md「VRT の決定性」: フォントのロード完了を待つ
        await document.fonts.ready;

        // 撮影前にフォーカスを外し、フォーカスリング描画有無の揺れを排除する。
        // マウス位置はあえて動かさない（hover で開く Tooltip 等を閉じてしまうため）
        const active = document.activeElement;
        if (active instanceof HTMLElement && active !== document.body) {
          active.blur();
        }

        // 撮影対象は canvasElement ではなく body（ポータル含む全体）とする。
        // Radix の Dialog / Popover / Tooltip 等は body 直下の portal にオーバーレイを
        // 描画するため、canvasElement の矩形だけを撮ると「Open 状態のストーリーなのに
        // トリガーしか写らない」ことになり、SPEC の検知範囲を満たさない。
        // fixed 配置のコンポーネント（CommandTrigger 等）も同様に body 撮影でのみ写る。
        // html には min-height: 100vh を注入済み（beforeAll）なので 0 サイズにはならない。
        // 注: page.elementLocator(document.documentElement) は Vitest Browser Mode で
        // locator('html') に解決され「要素が見つからない」エラーになるため body を使う
        await expect
          .element(page.elementLocator(document.body))
          .toMatchScreenshot(screenshotNameFor(storyFilePath, exportName, theme));
      });
    }
  }
}
