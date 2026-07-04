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
  args: {
    onOpenChange: fn(),
    children: null,
  },
  // Provider の外では default context の no-op ハンドラが使われ、クリックしても何も起きない
  render: () => <CloseConsumer />,
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Close palette" }));
    await expect(args.onOpenChange).not.toHaveBeenCalled();
  },
};
