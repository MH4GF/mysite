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
    // カバレッジ（SPEC.md ゲート①）は projects 横断でマージして計測する
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
                        // 比較は最も厳格にする。色差の閾値はゼロ、アンチエイリアス画素も比較対象に含め、
                        // 許容ミスマッチ画素数は未指定（= 1 画素でも差があれば fail）とする
                        threshold: 0,
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
