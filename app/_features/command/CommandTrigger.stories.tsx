import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";

import { CommandTrigger } from "./CommandTrigger";

const meta = {
  component: CommandTrigger,
  decorators: [
    // トリガーボタンは fixed 配置でビューポート右下に描画されるため、
    // canvasElement 自体が高さ 0 にならないようコンテナで最低限のサイズを確保する
    (Story) => (
      <div style={{ minHeight: "160px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CommandTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Open command palette" });
    await expect(button).toBeVisible();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
