import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { ColorModeScript } from "./ColorModeScript";

const meta = {
  component: ColorModeScript,
} satisfies Meta<typeof ColorModeScript>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const script = canvasElement.querySelector("script");
    await expect(script).not.toBeNull();

    // Assert on the meaningful logic embedded in the inline script rather than
    // snapshotting its full text, per SPEC.md's guidance for this component.
    const code = script?.textContent ?? "";
    await expect(code).toContain("prefers-color-scheme: dark");
    await expect(code).toContain("window.localStorage.isDarkMode");
    await expect(code).toContain("document.documentElement.classList.add('dark')");
    await expect(code).toContain("document.documentElement.classList.remove('dark')");
    await expect(code).toContain("darkModeMediaQuery.addEventListener('change'");
    await expect(code).toContain("window.addEventListener('storage'");
  },
};
