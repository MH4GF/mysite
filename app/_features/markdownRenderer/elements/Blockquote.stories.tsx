import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { handlers, SAMPLE_TWEET_ID } from "../../tweetEmbed/__tests__/handlers";
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
    "data-tweet-id": SAMPLE_TWEET_ID,
  },
  parameters: {
    msw: { handlers },
  },
  play: async ({ canvas, canvasElement }) => {
    // data-tweet-id があるときは TweetEmbed に委譲され、blockquote は描画されない
    await expect(await canvas.findByText("ツイート本文のプレースホルダです。")).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll("blockquote")).toHaveLength(0);
  },
};
