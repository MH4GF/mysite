import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";

import { CommandProvider, useCommandContext } from "./CommandProvider";

const CloseConsumer = () => {
  const { onOpenChange } = useCommandContext();
  return (
    <button type="button" onClick={() => onOpenChange(false)}>
      Close palette
    </button>
  );
};

const meta = {
  component: CommandProvider,
} satisfies Meta<typeof CommandProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProvidesOnOpenChange: Story = {
  args: {
    onOpenChange: fn(),
    children: <CloseConsumer />,
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Close palette" }));
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const WithoutProvider: Story = {
  // component の必須 prop を満たすためだけの args。render が CommandProvider 自体を
  // 描画しないため実際には使われず、観測対象はクリックが問題なく完了することのみ
  args: {
    onOpenChange: fn(),
  },
  render: () => <CloseConsumer />,
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Close palette" });
    // no-op ハンドラが呼ばれてもエラーにならず、クリックが問題なく完了することを確認する
    await userEvent.click(button);
    await expect(button).toBeVisible();
  },
};
