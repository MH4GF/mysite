import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Header } from "./Header";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("banner")).toBeVisible();
    await expect(
      canvas.getByRole("navigation", { name: "グローバルナビゲーション" }),
    ).toBeVisible();

    const homeLink = canvas.getByRole("link", { name: "mh4gf.dev" });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");
  },
};
