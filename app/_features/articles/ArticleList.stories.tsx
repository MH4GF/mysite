import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { compareDesc } from "@/app/_utils";

import { ArticleList } from "./ArticleList";
import type { ArticleMeta, TagEnum } from "./type";

// タグはこのストーリーの対象外（ArticleListItem.stories.tsx で検証済み）なので
// 空にして ArticleList 自身の分岐（allHref / アクティブなタグ判定）だけを検証する
const unsortedArticles: ArticleMeta[] = [
  {
    title: "Internal Article",
    href: "/blog/internal-article",
    externalLink: false,
    publishedAt: new Date("2024-02-01T12:00:00.000Z"),
    tags: [],
  },
  {
    title: "External Article",
    href: "https://example.com/external-article",
    externalLink: true,
    publishedAt: new Date("2024-01-01T12:00:00.000Z"),
    tags: [],
  },
];

// 本番（getArticlesMeta）と同じく公開日の降順で渡す。プロダクトと同じ経路で
// compareDesc をブラウザ側でも実行させる意図もある（unit / storybook 両パイプラインに
// ロードされるファイルは、両側で全関数を実行しないとカバレッジのマージで
// 0 カウントの重複エントリが残る。詳細は vitest.config.ts の coverage コメント参照）
const articles = [...unsortedArticles].sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));

const allTags: TagEnum[] = ["react", "typescript"];

const meta = {
  component: ArticleList,
  // UniversalLink -> Link が next/navigation の useRouter を利用するため、
  // Storybook の App Router モックを有効にする
  parameters: {
    nextjs: { appDirectory: true },
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

// ルートの blur-enter-content が子要素を opacity: 0 から段階的にアニメーション表示するため、
// タイミング依存の toBeVisible ではなく toBeInTheDocument / 属性アサーションで決定的に検証する
export const Default: Story = {
  args: {
    articles,
    title: "All Articles",
    allHref: "/articles",
    allTags,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { name: "All Articles", level: 1 }),
    ).toBeInTheDocument();

    const allChip = canvas.getByRole("link", { name: "All" });
    await expect(allChip).toHaveAttribute("href", "/articles");
    await expect(allChip.classList.contains("bg-accent")).toBe(true);

    const reactChip = canvas.getByRole("link", { name: "React" });
    await expect(reactChip).toHaveAttribute("href", "/tags/react");
    await expect(reactChip.classList.contains("bg-accent")).toBe(false);

    const internalLink = canvas.getByRole("link", { name: "Internal Article" });
    await expect(internalLink).toHaveAttribute("href", "/blog/internal-article");
    await expect(internalLink).not.toHaveAttribute("target", "_blank");

    const externalLink = canvas.getByRole("link", { name: /External Article/ });
    await expect(externalLink).toHaveAttribute("href", "https://example.com/external-article");
    await expect(externalLink).toHaveAttribute("target", "_blank");
  },
};

export const FilteredByTagWithoutAllLink: Story = {
  args: {
    articles,
    title: "React Articles",
    tag: "react",
    allTags,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { name: "React Articles", level: 1 }),
    ).toBeInTheDocument();

    // allHref が未指定のため All チップは描画されない
    await expect(canvas.queryByRole("link", { name: "All" })).toBeNull();

    const reactChip = canvas.getByRole("link", { name: "React" });
    await expect(reactChip.classList.contains("bg-accent")).toBe(true);

    const typescriptChip = canvas.getByRole("link", { name: "TypeScript" });
    await expect(typescriptChip.classList.contains("bg-accent")).toBe(false);
  },
};
