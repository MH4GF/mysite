import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, waitFor } from "storybook/test";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// `tooltip.tsx` starts with a lowercase letter, so it is exempt from the
// component/story existence check (scripts/checkStoryExistence.mts), but it
// is still subject to line-coverage gate ①.
const meta = {
  title: "Components/UI/Tooltip",
  render: () => (
    // delayDuration=0 keeps the story deterministic (no reliance on the 700ms default hover delay)
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByText("Hover me");
    await expect(trigger).toBeVisible();
    await expect(screen.queryByText("Tooltip content")).toBeNull();
  },
};

// Radix Tooltip renders its content into a portal appended to document.body,
// which lives outside canvasElement, so assertions use `screen` instead of `canvas`.
export const Open: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByText("Hover me");
    await userEvent.hover(trigger);

    // Radix renders the content twice: once visible, once in a visually-hidden
    // live region for screen readers. Wait for the visible one specifically.
    await waitFor(async () => {
      const matches = screen.getAllByText("Tooltip content");
      await expect(matches.some((element) => element.checkVisibility())).toBe(true);
    });
  },
};
