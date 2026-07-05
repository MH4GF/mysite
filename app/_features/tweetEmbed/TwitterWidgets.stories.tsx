import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { expect, fn, waitFor } from "storybook/test";

import { TwitterWidgets } from "./TwitterWidgets";

// SPEC.md「コンポーネントテスト（Storybook）」: 外部依存（platform.twitter.com の widgets.js）は
// MSW でモックし、ストーリーを実ネットワークから切り離して決定的にする。
// next/script (lazyOnload) が挿入する <script> のリクエストを Service Worker が横取りし、
// 空のスクリプトを返す
const worker = setupWorker(
  http.get("https://platform.twitter.com/widgets.js", () => {
    return new HttpResponse("/* mocked twitter widgets.js */", {
      headers: { "Content-Type": "application/javascript" },
    });
  }),
);

const meta = {
  component: TwitterWidgets,
  // ストーリー毎に worker を start/stop し、後続ストーリーへのリークを防ぐ
  // (AskAIDropdown.stories.tsx と同じパターン)
  beforeEach: async () => {
    await worker.start({ onUnhandledRequest: "bypass", quiet: true });
    return () => {
      worker.stop();
    };
  },
} satisfies Meta<typeof TwitterWidgets>;

export default meta;

type Story = StoryObj<typeof meta>;

const load = fn();

// window.twttr が既に存在する場合、マウント時（パス変更時）に widgets.load() が呼ばれる
export const WidgetsAlreadyLoaded: Story = {
  loaders: [
    () => {
      load.mockClear();
      window.twttr = { widgets: { load } };
    },
  ],
  play: async () => {
    await waitFor(async () => {
      await expect(load).toHaveBeenCalled();
    });
  },
};

// window.twttr が未定義の場合は何もしない（スクリプトのロード完了を待つだけ）
export const WithoutWidgets: Story = {
  loaders: [
    () => {
      load.mockClear();
      Reflect.deleteProperty(window, "twttr");
    },
  ],
  play: async () => {
    await expect(window.twttr).toBeUndefined();
    await expect(load).not.toHaveBeenCalled();
  },
};
