import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import type { ArticleMeta } from "@/app/_features/articles/type";

import { ArticleNavigation } from "./ArticleNavigation";

const older: ArticleMeta = {
  title: "Older Article",
  href: "/blog/older-article",
  externalLink: false,
  publishedAt: new Date("2024-01-01T12:00:00.000Z"),
  tags: [],
};

const newer: ArticleMeta = {
  title: "Newer Article",
  href: "/blog/newer-article",
  externalLink: false,
  publishedAt: new Date("2024-02-01T12:00:00.000Z"),
  tags: [],
};

const meta = {
  component: ArticleNavigation,
  // UniversalLink -> Link が next/navigation の useRouter を利用するため、
  // Storybook の App Router モックを有効にする
  parameters: {
    nextjs: { appDirectory: true },
  },
} satisfies Meta<typeof ArticleNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Both: Story = {
  args: { older, newer },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("← Older")).toBeVisible();
    await expect(canvas.getByRole("link", { name: /Older Article/ })).toHaveAttribute(
      "href",
      "/blog/older-article",
    );
    await expect(canvas.getByText("Newer →")).toBeVisible();
    await expect(canvas.getByRole("link", { name: /Newer Article/ })).toHaveAttribute(
      "href",
      "/blog/newer-article",
    );
  },
};

export const OlderOnly: Story = {
  args: { older, newer: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("← Older")).toBeVisible();
    await expect(canvas.queryByText("Newer →")).toBeNull();
  },
};

export const NewerOnly: Story = {
  args: { older: undefined, newer },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Newer →")).toBeVisible();
    await expect(canvas.queryByText("← Older")).toBeNull();
  },
};

export const None: Story = {
  args: { older: undefined, newer: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("nav")).toBeNull();
  },
};
