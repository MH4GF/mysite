import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { setupWorker } from "msw/browser";
import { expect, within } from "storybook/test";

import { handlers, SAMPLE_TWEET_ID } from "./__tests__/handlers";
import { TweetEmbed } from "./TweetEmbed";

// react-tweet はブラウザでは SWR で syndication API を取得する。
// 外部依存を MSW でモックし、ストーリーを決定的にする
const worker = setupWorker(...handlers);

const meta = {
  component: TweetEmbed,
  beforeEach: async () => {
    await worker.start({ quiet: true, onUnhandledRequest: "bypass" });
    return () => {
      worker.stop();
    };
  },
} satisfies Meta<typeof TweetEmbed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: SAMPLE_TWEET_ID,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // SWR の解決を待つ。取得前は TweetSkeleton が描画される
    await expect(await canvas.findByText("ツイート本文のプレースホルダです。")).toBeInTheDocument();
    await expect(canvas.getByText("テストユーザー")).toBeInTheDocument();
  },
};
