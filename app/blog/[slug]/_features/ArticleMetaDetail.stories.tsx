import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Article } from "contentlayer/generated";
import { expect } from "storybook/test";

import { ArticleMetaDetail } from "./ArticleMetaDetail";

const baseArticle: Article = {
  // biome-ignore lint/style/useNamingConvention: contentlayer 生成型 Article のフィールド名に合わせる
  _id: "articles/sample-article.md",
  // biome-ignore lint/style/useNamingConvention: contentlayer 生成型 Article のフィールド名に合わせる
  _raw: {},
  type: "Article",
  title: "Sample Article Title",
  description: "Sample description",
  publishedAt: "2024-01-15T12:00:00.000Z",
  tags: ["dev"],
  body: { raw: "# Hello", html: "<h1>Hello</h1>" },
  href: "/blog/sample-article",
  slug: "sample-article",
  externalLink: false,
};

const meta = {
  component: ArticleMetaDetail,
  decorators: [
    // 本番では app/blog/[slug]/page.tsx が `max-w-3xl` のコンテナで記事本文を包む。
    // このストーリーではその制約がないため、next/image の width="1120" がコンテナ幅を
    // 超えて VRT の body 撮影で右端が切れる。本番同様のコンテナ幅で包み、はみ出しを隠す
    (Story) => (
      <div className="max-w-3xl mx-auto overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleMetaDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

// ルート要素の blur-enter-content が子要素を opacity: 0 から段階的にアニメーション表示するため、
// タイミング依存の toBeVisible ではなく toBeInTheDocument で決定的にアサーションする
export const WithHeadingImage: Story = {
  args: {
    article: { ...baseArticle, headingImage: "/images/sample-heading.jpg" },
    markdownUrl: "/blog/sample-article.md",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Sample Article Title" })).toBeInTheDocument();
    await expect(canvas.getByText("2024-01-15")).toBeInTheDocument();
    await expect(canvas.getByText("Ask AI")).toBeInTheDocument();
    await expect(canvas.getByAltText("ヘッダー画像")).toBeInTheDocument();
  },
};

export const WithoutHeadingImage: Story = {
  args: {
    article: baseArticle,
    markdownUrl: "/blog/sample-article.md",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Sample Article Title" })).toBeInTheDocument();
    await expect(canvas.queryByAltText("ヘッダー画像")).toBeNull();
  },
};
