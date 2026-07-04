import { describe, expect, it, vi } from "vitest";
import type { ArticleMeta } from "@/app/_features/articles";

const internalArticle: ArticleMeta = {
  title: "Internal Article",
  href: "/blog/internal-article",
  externalLink: false,
  publishedAt: new Date("2024-05-01"),
  tags: ["nextjs"],
};

const externalArticle: ArticleMeta = {
  title: "External Article",
  href: "https://external.example.com/post",
  externalLink: true,
  publishedAt: new Date("2024-04-01"),
  tags: ["dev"],
};

const getArticlesMeta = vi.fn<() => ArticleMeta[]>();

vi.mock("@/app/_features/articles", () => ({
  getArticlesMeta: () => getArticlesMeta(),
}));

describe("getRssFeed", () => {
  it("prefixes site url for internal article links and keeps external links as-is", async () => {
    getArticlesMeta.mockReturnValue([internalArticle, externalArticle]);
    const { getRssFeed } = await import("../getRssFeed");

    const xml = getRssFeed();

    expect(xml).toContain("<link>https://mh4gf.dev/blog/internal-article</link>");
    expect(xml).toContain("<link>https://external.example.com/post</link>");
    expect(xml).toContain("<title><![CDATA[Internal Article]]></title>");
    expect(xml).toContain("<title><![CDATA[External Article]]></title>");
    expect(xml).toContain("<title><![CDATA[Hirotaka Miyagi]]></title>");
    expect(xml).toContain(
      '<atom:link href="https://mh4gf.dev/articles/feed" rel="self" type="application/rss+xml"/>',
    );
  });

  it("produces a valid feed with no items", async () => {
    getArticlesMeta.mockReturnValue([]);
    const { getRssFeed } = await import("../getRssFeed");

    const xml = getRssFeed();

    expect(xml).toContain("<title><![CDATA[Hirotaka Miyagi]]></title>");
    expect(xml).not.toContain("<item>");
  });
});
