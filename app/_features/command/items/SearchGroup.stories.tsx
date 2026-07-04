import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Command as CommandRoot } from "cmdk";
import { expect, userEvent, waitFor } from "storybook/test";

import { CommandInput, CommandList } from "@/app/_components/ui/command";
import { SearchGroup } from "./SearchGroup";

type PagefindSearch = NonNullable<Window["pagefind"]>["search"];

/**
 * window.pagefind を決定的なモックに差し替える。
 * SearchGroup.tsx はモジュール読み込み時に pagefind の動的 import（失敗時はフォールバック代入）を
 * 行うため、その初期化完了を待ってから上書きする（完了前に上書きすると初期化側の代入で巻き戻る）。
 */
const overridePagefind = async (search: PagefindSearch) => {
  await waitFor(() => expect(window.pagefind).toBeDefined(), { timeout: 5000 });
  window.pagefind = { search };
};

const internalArticle = {
  id: "internal-article",
  data: () =>
    Promise.resolve({
      url: "/server/app/blog/internal-article.html",
      meta: { title: "Internal Article" },
      excerpt: "internal",
    }),
};

const externalArticle = {
  id: "external-article",
  data: () =>
    Promise.resolve({
      url: "/server/app/blog/external-article.html",
      meta: { title: "External Article", externalLink: "true" as const },
      excerpt: "external",
    }),
};

const meta = {
  component: SearchGroup,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    // SearchGroup は cmdk の Command ルート配下でのみ動作する。
    // 検索クエリを入力できるよう CommandInput も併せてレンダリングする
    (Story) => (
      <CommandRoot label="Search">
        <CommandInput placeholder="Search articles..." />
        <CommandList>
          <Story />
        </CommandList>
      </CommandRoot>
    ),
  ],
} satisfies Meta<typeof SearchGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  // 検索が完了するまでの間、3 件のローディングスケルトンを表示する
  play: async ({ canvas }) => {
    await overridePagefind(() => new Promise(() => undefined));
    await userEvent.type(canvas.getByPlaceholderText("Search articles..."), "next");
    await waitFor(() => expect(canvas.getAllByRole("progressbar")).toHaveLength(3));
  },
};

export const NoResults: Story = {
  // 検索結果が 0 件の場合、クエリを含めた旨を表示する
  play: async ({ canvas }) => {
    await overridePagefind(() => Promise.resolve({ results: [] }));
    await userEvent.type(canvas.getByPlaceholderText("Search articles..."), "zzz");
    await waitFor(() => expect(canvas.getByText('No results found for "zzz"')).toBeVisible());
  },
};

export const WithResults: Story = {
  // 検索結果をブログ記事へのリンクとして表示する。外部リンク記事はアイコンが変わる
  play: async ({ canvas }) => {
    await overridePagefind(() => Promise.resolve({ results: [internalArticle, externalArticle] }));
    await userEvent.type(canvas.getByPlaceholderText("Search articles..."), "article");

    await waitFor(async () => {
      const internalLink = canvas.getByRole("option", { name: "Internal Article" });
      await expect(internalLink).toHaveAttribute("href", "/blog/internal-article");
      const externalLink = canvas.getByRole("option", { name: "External Article" });
      await expect(externalLink).toHaveAttribute("href", "/blog/external-article");
    });
  },
};

export const ResultLoading: Story = {
  // 検索結果は返っているが各記事のメタデータ取得中の場合、その件数分のスケルトンを表示する
  play: async ({ canvas }) => {
    await overridePagefind(() =>
      Promise.resolve({
        results: [{ id: "pending-article", data: () => new Promise<never>(() => undefined) }],
      }),
    );
    await userEvent.type(canvas.getByPlaceholderText("Search articles..."), "pending");
    await waitFor(() => expect(canvas.getAllByRole("progressbar")).toHaveLength(1));
  },
};
