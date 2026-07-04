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

// documentElement の初期状態。ストーリーの副作用（ColorModeScript のインライン script や
// ColorTheme のトグル等）で変化しても afterEach で完全復元するために保持する
let initialHtmlClassName = "";

// SPEC.md「VRT の決定性」: 撮影環境を固定する
beforeAll(() => {
  initialHtmlClassName = document.documentElement.className;

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
       水平方向にずれて右端 1 列分の非決定差分になる。ガター幅を常に確保して排除する */
    html {
      scrollbar-gutter: stable;
    }
  `;
  document.head.appendChild(style);
});

// 現在のテストが body に追加したストーリー用コンテナ
let activeCanvasElement: HTMLElement | undefined;

afterEach(() => {
  // 【重要】React ツリーをここで手動破壊しないこと。
  // portable stories の unmount コールバックは「次の story.run() の冒頭」で遅延実行される
  // （composeStories 内部のモジュール共有 cleanups 配列）。そのため、ここで
  // body.replaceChildren() 等により React 管理下の DOM（Radix 等が body 直下に追加する
  // portal を含む）を直接消すと、遅延アンマウント時に React の removeChild が
  // NotFoundError を投げ、後続テストが連鎖失敗する。
  // コンテナは中身（マウント済みツリー）を保ったまま detach するだけにし、portal や
  // body のスタイル復元（react-remove-scroll 等）は遅延アンマウントに正しく回収させる
  activeCanvasElement?.remove();
  activeCanvasElement = undefined;

  // ストーリーの副作用が次のテストへ漏れないよう、グローバル状態を完全復元する
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
        // null レンダリングのストーリー（例: ArticleNavigation の None）でも撮影対象が
        // 0px にならないようにする。Playwright は 0 サイズ要素を撮影できず、
        // stable screenshot 待ちの 5000ms タイムアウトになる
        canvasElement.style.minHeight = "1px";
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

        await expect
          .element(page.elementLocator(canvasElement))
          .toMatchScreenshot(screenshotNameFor(storyFilePath, exportName, theme));
      });
    }
  }
}
