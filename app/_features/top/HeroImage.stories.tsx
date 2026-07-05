import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, waitFor } from "storybook/test";

import hiroshimaTripImage from "../../../public/images/hiroshima-trip.jpeg";
import { HeroImage } from "./index";

const meta = {
  component: HeroImage,
  args: {
    src: hiroshimaTripImage,
    alt: "Hiroshima trip",
    tooltip: "Hiroshima trip :)",
  },
} satisfies Meta<typeof HeroImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Hiroshima trip" })).toBeVisible();
  },
};

export const TooltipVisible: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("img", { name: "Hiroshima trip" }));

    // Radix Tooltip はポータルで canvasElement 外に描画されるため screen から取得する
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeVisible(), { timeout: 2000 });
    await expect(screen.getByRole("tooltip")).toHaveTextContent("Hiroshima trip :)");
  },
};
