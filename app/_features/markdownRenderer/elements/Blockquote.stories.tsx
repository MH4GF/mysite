import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Blockquote } from "./Blockquote";

const meta = {
  component: Blockquote,
} satisfies Meta<typeof Blockquote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "引用されたテキストです。",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("引用されたテキストです。")).toBeVisible();
    await expect(canvasElement.querySelectorAll("blockquote")).toHaveLength(1);
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "custom-quote",
    children: "クラス名付きの引用です。",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("クラス名付きの引用です。")).toBeVisible();
    const blockquote = canvasElement.querySelector("blockquote");
    await expect(blockquote).toHaveClass("custom-quote");
    // twitter-tweet ではないため TweetEmbed には委譲されない
    await expect(canvasElement.querySelectorAll("blockquote")).toHaveLength(1);
  },
};

export const TwitterTweet: Story = {
  args: {
    className: "twitter-tweet",
    children: "ツイート本文のプレースホルダです。",
  },
  play: async ({ canvasElement }) => {
    // TweetEmbed に委譲され、ライト / ダーク両テーマ用の blockquote が描画される
    const light = canvasElement.querySelector('blockquote[data-theme="light"]');
    const dark = canvasElement.querySelector('blockquote[data-theme="dark"]');
    await expect(light).not.toBeNull();
    await expect(dark).not.toBeNull();
  },
};
