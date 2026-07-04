import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { GitHubIcon, XIcon } from "./icons";

// `icons.tsx` starts with a lowercase letter, so it is exempt from the
// component/story existence check (scripts/checkStoryExistence.mts), but it
// is still subject to line-coverage gate ①. This story renders every icon
// component from the module so each is exercised for coverage.
const meta = {
  title: "Components/Icons",
  render: () => (
    <div>
      <XIcon className="x-icon" />
      <GitHubIcon className="github-icon" />
    </div>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const xIcon = canvasElement.querySelector(".x-icon");
    await expect(xIcon).not.toBeNull();
    await expect(xIcon).toHaveAttribute("viewBox", "0 0 1200 1227");

    const githubIcon = canvasElement.querySelector(".github-icon");
    await expect(githubIcon).not.toBeNull();
    await expect(githubIcon).toHaveAttribute("viewBox", "0 0 24 24");
    await expect(githubIcon).toHaveAttribute("aria-hidden", "true");
  },
};
