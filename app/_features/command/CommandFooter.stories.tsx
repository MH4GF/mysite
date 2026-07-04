import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { CommandFooter } from "./CommandFooter";

const meta = {
  component: CommandFooter,
} satisfies Meta<typeof CommandFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Actions")).toBeVisible();
    await expect(canvas.getByText("⌘")).toBeVisible();
    await expect(canvas.getByText("K")).toBeVisible();
  },
};
