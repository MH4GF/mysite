import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, waitFor } from "storybook/test";

import { MyAvatar } from "./MyAvatar";

const meta = {
  component: MyAvatar,
} satisfies Meta<typeof MyAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByAltText("MH4GF profile picture");
    await expect(trigger).toBeVisible();
  },
};

// Radix Dialog はポータルで canvasElement 外に描画されるため screen から取得する
export const Open: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByAltText("MH4GF profile picture");
    await userEvent.click(trigger);

    // DialogTitle は a11y のため VisuallyHiddenRoot でラップされ視覚的には非表示だが、
    // スクリーンリーダー向けに DOM 上には存在するため toBeVisible ではなく toBeInTheDocument を使う
    const title = await screen.findByText("MH4GF profile picture");
    await expect(title).toBeInTheDocument();

    const description = screen.getByText(
      "MH4GF profile picture. The rabbit in the front, his name is Ponpoko.",
    );
    // ダイアログの内容は fade/zoom でアニメーション表示されるため、opacity: 0 の初期フレームとの
    // レースを避けるためトランジション完了を待ってから可視性をアサートする
    await waitFor(() => expect(description).toBeVisible());
  },
};
