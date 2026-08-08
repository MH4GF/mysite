import { describe, expect, it, vi } from "vitest";
import { getAdjacentArticles } from "../getAdjacentArticles";
import type { ArticleMeta } from "../type";

const { mockArticles, mockGetArticlesMeta } = vi.hoisted(() => {
  const mockArticles: ArticleMeta[] = [
    {
      title: "Article 3 (newest)",
      href: "/blog/article-3",
      externalLink: false,
      publishedAt: new Date("2025-03-01"),
      tags: [],
    },
    {
      title: "Article 2 (middle)",
      href: "/blog/article-2",
      externalLink: false,
      publishedAt: new Date("2025-02-01"),
      tags: [],
    },
    {
      title: "Article 1 (oldest)",
      href: "/blog/article-1",
      externalLink: false,
      publishedAt: new Date("2025-01-01"),
      tags: [],
    },
  ];
  const mockGetArticlesMeta = vi.fn(() => mockArticles);
  return { mockArticles, mockGetArticlesMeta };
});

vi.mock("../getArticlesMeta", () => ({
  getArticlesMeta: mockGetArticlesMeta,
}));

describe("getAdjacentArticles", () => {
  it("delegates to getArticlesMeta({}) and findAdjacentArticles", () => {
    const result = getAdjacentArticles("/blog/article-2");

    expect(mockGetArticlesMeta).toHaveBeenCalledWith({});
    expect(result.newer).toBe(mockArticles[0]);
    expect(result.older).toBe(mockArticles[2]);
  });

  it("returns undefined for both when href has no match", () => {
    const result = getAdjacentArticles("/blog/does-not-exist");

    expect(result.newer).toBeUndefined();
    expect(result.older).toBeUndefined();
  });
});
