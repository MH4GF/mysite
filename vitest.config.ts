// biome-ignore lint/correctness/noNodejsModules: Config file needs Node.js path to resolve the Storybook config directory
import path from "node:path";
// biome-ignore lint/correctness/noNodejsModules: Config file needs Node.js url to resolve the Storybook config directory
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/nextjs-vite/vite-plugin";
import { playwright } from "@vitest/browser-playwright";
import type { Plugin } from "vitest/config";
import { defineConfig } from "vitest/config";

import { coverageExclusions } from "./coverageExclusions";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// @storybook/nextjs-vite/vite-plugin の型定義が any のため、明示的に型を付ける
const nextJsVitePlugin = storybookNextJsPlugin as () => Plugin[];

// コンポーネントVRT（SPEC.md「コンポーネントテスト（Storybook）」「VRT の決定性」）は
// CI と同一 digest の Playwright コンテナ内でのみ実行する（scripts/vrt.sh が VRT=1 を設定する）。
// ホストの通常実行（pnpm test:vitest）では projects に含めないことで、
// レンダリング環境の異なるホスト（macOS 等）産スナップショットの混入を構成上排除する
const isVrt = process.env.VRT === "1";

export default defineConfig({
  test: {
    // カバレッジ（SPEC.md ゲート①）は projects 横断でマージして計測する。
    //
    // 既知の制約: unit（Node）と storybook（ブラウザ）の両方にロードされるファイルは、
    // トランスフォーム差で関数の位置情報がパイプライン間で微妙にずれ、マージ時に
    // 同一関数が別エントリとして重複登録される（v8 / istanbul どちらのプロバイダでも発生）。
    // 片方のパイプラインで「ロードされたが実行されない」関数があると 0 カウントの
    // 重複エントリが残り、実カバレッジ 100% でも functions が 100% にならない。
    // したがって両パイプラインにロードされるファイル（_utils 等の共有モジュール）は、
    // ユニットテストに加えてストーリー側でも全関数を実行すること
    // （例: ArticleList.stories.tsx の compareDesc によるフィクスチャソート）
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["app/**/*.{ts,tsx}"],
      exclude: coverageExclusions,
      thresholds: {
        lines: 100,
        branches: 100,
        functions: 100,
        statements: 100,
      },
    },
    projects: [
      {
        // "unit" プロジェクトには Next.js 用のプラグインが無く、tsconfig.json の
        // paths（"@/*"）がそのままでは解決されない。SUT が "@/..." で内部 import する
        // ケース（例: getRssFeed.ts）を素の import で unit テストできるよう明示的に設定する
        resolve: {
          alias: {
            "@": dirname,
          },
        },
        // "unit" プロジェクトは React 用 Vite プラグインを持たないため、tsconfig の
        // jsx:"preserve"（Next/SWC 前提）のままだと esbuild が classic transform にフォールバックし、
        // グローバル `React` を要求してしまう（RSC 等 JSX を含むモジュールを import すると
        // "React is not defined" で失敗する）。automatic ランタイムを明示し react-jsx 相当に固定する
        esbuild: {
          jsx: "automatic",
        },
        test: {
          name: "unit",
          include: ["**/__tests__/**/*.test.ts?(x)"],
        },
      },
      {
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            storybookScript: "pnpm storybook --no-open",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
      ...(isVrt
        ? [
            {
              plugins: [nextJsVitePlugin()],
              test: {
                name: "component-vrt",
                include: ["app/__vrt__/componentVrt.test.tsx"],
                browser: {
                  enabled: true,
                  provider: playwright({}),
                  headless: true,
                  instances: [{ browser: "chromium" as const }],
                  // 失敗時のページ全体スクリーンショットを基準画像ディレクトリ（__screenshots__、
                  // git コミット対象）に書き込まないようにする。actual / diff 画像は
                  // toMatchScreenshot が .vitest-attachments/（gitignore 済み）に保存する
                  screenshotFailures: false,
                  expect: {
                    toMatchScreenshot: {
                      comparatorName: "pixelmatch" as const,
                      comparatorOptions: {
                        // SPEC.md「VRT の決定性」: 実行環境を単一コンテナ digest に固定しているため、
                        // 比較は最厳格に寄せる。アンチエイリアス画素も比較対象に含め、
                        // 許容ミスマッチ画素数は未指定（= 1 画素でも差があれば fail）とする。
                        // threshold（ピクセル単位の色差の知覚閾値）は 0 ではなく 0.01 とする:
                        // Chromium は同一 DOM でも角丸境界等の AA 描画で ±1/255 程度の
                        // チャンネル値の揺れを起こし（threshold 0 での実測で再現済み）、
                        // 0.01 はこのサブ知覚ノイズのみを吸収する（pixelmatch 既定値 0.1 の 1/10）
                        threshold: 0.01,
                        includeAA: true,
                      },
                      // 撮影時のアニメーションは Playwright 側でも停止する（テスト側の style 注入と二重の防御）
                      screenshotOptions: {
                        animations: "disabled" as const,
                      },
                    },
                  },
                },
              },
            },
          ]
        : []),
    ],
  },
});
