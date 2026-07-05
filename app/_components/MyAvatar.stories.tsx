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

    // DialogTitle is wrapped in VisuallyHiddenRoot for a11y (kept for screen readers,
    // not visually shown), so it is present in the DOM but intentionally not `toBeVisible()`.
    const title = await screen.findByText("MH4GF profile picture");
    await expect(title).toBeInTheDocument();

    const description = screen.getByText(
      "MH4GF profile picture. The rabbit in the front, his name is Ponpoko.",
    );
    // The dialog content animates in (fade/zoom), so wait for the transition to finish
    // before asserting visibility to avoid a race with the opacity-0 initial frame.
    await waitFor(() => expect(description).toBeVisible());
  },
};
