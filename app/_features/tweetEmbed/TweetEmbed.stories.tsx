import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { handlers, SAMPLE_TWEET_ID } from "./__tests__/handlers";
import { TweetEmbed } from "./TweetEmbed";

const meta = {
  component: TweetEmbed,
} satisfies Meta<typeof TweetEmbed>;

export default meta;

type Story = StoryObj<typeof meta>;

// react-tweet はブラウザでは SWR で syndication API からツイートを取得する。
// MSW で固定レスポンスを返し、外部ネットワークに一切依存せず決定的にする
export const Default: Story = {
  args: {
    id: SAMPLE_TWEET_ID,
  },
  parameters: {
    msw: { handlers },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // SWR の解決を待つ。取得前は TweetSkeleton が描画される
    await expect(await canvas.findByText("ツイート本文のプレースホルダです。")).toBeInTheDocument();
    await expect(canvas.getByText("テストユーザー")).toBeInTheDocument();
  },
};
