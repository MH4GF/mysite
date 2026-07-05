import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { UniversalLink } from "./index";

const meta = {
  component: UniversalLink,
  args: {
    href: "/blog",
    children: "内部リンク",
  },
} satisfies Meta<typeof UniversalLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "内部リンク" });
    await expect(link).toHaveAttribute("href", "/blog");
    await expect(link).not.toHaveAttribute("target");
  },
};

export const External: Story = {
  args: {
    href: "https://example.com/",
    children: "外部リンク",
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "外部リンク" });
    await expect(link).toHaveAttribute("href", "https://example.com/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noreferrer");
  },
};

export const ExternalByProp: Story = {
  args: {
    isExternal: true,
    children: "isExternal 指定のリンク",
  },
  play: async ({ canvas }) => {
    // same-origin の href でも isExternal 指定なら外部リンクとして扱う
    const link = canvas.getByRole("link", { name: "isExternal 指定のリンク" });
    await expect(link).toHaveAttribute("href", "/blog");
    await expect(link).toHaveAttribute("target", "_blank");
  },
};

export const WithUnderline: Story = {
  args: {
    isEnabledUnderline: true,
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "内部リンク" });
    await expect(link).toHaveClass("border-b");
    await expect(link).toHaveClass("no-underline");
  },
};

export const WithHoveredUnderline: Story = {
  args: {
    isEnabledHoveredUnderline: true,
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "内部リンク" });
    await expect(link).toHaveClass("hover:border-b");
    await expect(link).not.toHaveClass("border-b");
  },
};

export const WithClassName: Story = {
  args: {
    className: "font-bold",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "内部リンク" })).toHaveClass("font-bold");
  },
};
