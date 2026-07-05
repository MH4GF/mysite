import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, waitFor } from "storybook/test";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// `popover.tsx` は小文字始まりのため component/story 存在チェック
// (scripts/checkStoryExistence.mts) の対象外だが、カバレッジ gate ① の対象ではある
const meta = {
  title: "Components/UI/Popover",
  render: () => (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByText("Open popover");
    await expect(trigger).toBeVisible();
    await expect(screen.queryByText("Popover content")).toBeNull();
  },
};

// Radix Popover はポータルで canvasElement 外に描画されるため screen から取得する
export const Open: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByText("Open popover");
    await userEvent.click(trigger);

    const content = await screen.findByText("Popover content");
    // The popover animates in (fade/zoom), so wait for the transition to finish
    // before asserting visibility to avoid a race with the opacity-0 initial frame.
    await waitFor(() => expect(content).toBeVisible());
  },
};
