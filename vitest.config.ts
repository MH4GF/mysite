// biome-ignore lint/correctness/noNodejsModules: Config file needs Node.js path to resolve the Storybook config directory
import path from "node:path";
// biome-ignore lint/correctness/noNodejsModules: Config file needs Node.js url to resolve the Storybook config directory
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

import { coverageExclusions } from "./coverageExclusions";

const dirname = path.dirname(fileURLToPath(import.meta.url));

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
    ],
  },
});
