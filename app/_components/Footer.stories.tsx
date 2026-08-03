import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Footer } from "./Footer";

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    // 年をまたぐと表示年が変わり VRT 基準画像の更新が必要になるが、これは意図した挙動として許容する
    const copyright = canvas.getByText(
      `© ${new Date().getFullYear()} Hirotaka Miyagi, All rights reserved.`,
    );
    await expect(copyright).toBeVisible();

    const footer = canvasElement.querySelector("footer");
    await expect(footer).toHaveClass("flex");
    await expect(footer).toHaveClass("border-t");
  },
};

export const WithClassName: Story = {
  args: {
    className: "custom-footer-class",
  },
  play: async ({ canvasElement }) => {
    const footer = canvasElement.querySelector("footer");
    await expect(footer).toHaveClass("custom-footer-class");
    await expect(footer).toHaveClass("flex");
  },
};
