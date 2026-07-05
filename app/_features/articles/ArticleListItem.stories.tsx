import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { ArticleListItem } from "./ArticleListItem";

const meta = {
  component: ArticleListItem,
} satisfies Meta<typeof ArticleListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  args: {
    title: "Internal Article",
    href: "/blog/internal-article",
    externalLink: false,
    publishedAt: new Date("2024-01-15T12:00:00.000Z"),
    tags: ["react"],
    currentTag: "react",
  },
  play: async ({ canvas, canvasElement }) => {
    const link = canvas.getByRole("link", { name: "Internal Article" });
    await expect(link).toHaveAttribute("href", "/blog/internal-article");
    await expect(link).not.toHaveAttribute("target", "_blank");
    await expect(link.querySelector("svg")).toBeNull();
    await expect(canvas.getByText("2024-01-15")).toBeVisible();

    // currentTag と同じタグしか持たないため、フィルタ後のタグ一覧は非表示になる
    const article = canvasElement.querySelector("article");
    await expect(article?.children.length).toBe(1);
  },
};

export const ExternalWithMultipleTags: Story = {
  args: {
    title: "External Article",
    href: "https://example.com/post",
    externalLink: true,
    publishedAt: new Date("2023-05-01T12:00:00.000Z"),
    tags: ["react", "typescript"],
    currentTag: undefined,
  },
  play: async ({ canvas, canvasElement }) => {
    const link = canvas.getByRole("link", { name: /External Article/ });
    await expect(link).toHaveAttribute("href", "https://example.com/post");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link.querySelector("svg")).not.toBeNull();

    await expect(canvas.getByRole("link", { name: "React" })).toHaveAttribute(
      "href",
      "/tags/react",
    );
    await expect(canvas.getByRole("link", { name: "TypeScript" })).toHaveAttribute(
      "href",
      "/tags/typescript",
    );

    // 末尾以外のタグにのみカンマ区切りが付く
    await expect(canvasElement.textContent).toContain("React, TypeScript");
  },
};

export const NoTags: Story = {
  args: {
    title: "No Tags Article",
    href: "/blog/no-tags",
    externalLink: false,
    publishedAt: new Date("2022-12-31T12:00:00.000Z"),
    tags: [],
    currentTag: undefined,
  },
  play: async ({ canvasElement }) => {
    const article = canvasElement.querySelector("article");
    await expect(article?.children.length).toBe(1);
  },
};
