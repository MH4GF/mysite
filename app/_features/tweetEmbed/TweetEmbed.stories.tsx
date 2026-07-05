import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { TweetEmbed } from "./TweetEmbed";

const meta = {
  component: TweetEmbed,
} satisfies Meta<typeof TweetEmbed>;

export default meta;

type Story = StoryObj<typeof meta>;

// Twitter ウィジェットの外部スクリプト（TwitterWidgets）を読み込まない状態、
// すなわちハイドレーション前のプレースホルダ表示をストーリーとして固定する。
// 外部ネットワークに一切依存せず決定的である
export const Default: Story = {
  args: {
    className: "twitter-tweet",
    children: "ツイート本文のプレースホルダです。",
  },
  play: async ({ canvasElement }) => {
    // ライト / ダーク両テーマ用の blockquote が描画され、CSS でどちらか一方だけが表示される
    const light = canvasElement.querySelector('blockquote[data-theme="light"]');
    const dark = canvasElement.querySelector('blockquote[data-theme="dark"]');
    await expect(light).not.toBeNull();
    await expect(dark).not.toBeNull();
    await expect(light).toHaveClass("twitter-tweet");
    await expect(dark).toHaveClass("twitter-tweet");
  },
};
