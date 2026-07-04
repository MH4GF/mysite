import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Time } from "./Time";

const meta = {
  component: Time,
} satisfies Meta<typeof Time>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateTime: "2024-01-15",
    children: "2024-01-15",
  },
  play: async ({ canvas }) => {
    const time = canvas.getByText("2024-01-15");
    await expect(time).toBeVisible();
    await expect(time).toHaveAttribute("datetime", "2024-01-15");
  },
};

export const WithClassName: Story = {
  args: {
    dateTime: "2024-01-15",
    children: "2024-01-15",
    className: "uppercase",
  },
  play: async ({ canvas }) => {
    const time = canvas.getByText("2024-01-15");
    await expect(time).toHaveClass("uppercase");
    await expect(time).toHaveClass("font-mono");
  },
};
