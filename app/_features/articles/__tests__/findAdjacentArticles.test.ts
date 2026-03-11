import { describe, expect, it } from "vitest";
import { findAdjacentArticles } from "../findAdjacentArticles";
import type { ArticleMeta } from "../type";

const articles: ArticleMeta[] = [
  {
    title: "Article 3 (newest)",
    href: "/blog/article-3",
    externalLink: false,
    publishedAt: new Date("2025-03-01"),
    tags: [],
  },
  {
    title: "External Article",
    href: "https://example.com/external",
    externalLink: true,
    publishedAt: new Date("2025-02-15"),
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

describe("findAdjacentArticles", () => {
  it("returns both older and newer for a middle article", () => {
    const result = findAdjacentArticles(articles, "/blog/article-2");
    expect(result.newer?.href).toBe("/blog/article-3");
    expect(result.older?.href).toBe("/blog/article-1");
  });

  it("returns no newer for the newest article", () => {
    const result = findAdjacentArticles(articles, "/blog/article-3");
    expect(result.newer).toBeUndefined();
    expect(result.older?.href).toBe("/blog/article-2");
  });

  it("returns no older for the oldest article", () => {
    const result = findAdjacentArticles(articles, "/blog/article-1");
    expect(result.newer?.href).toBe("/blog/article-2");
    expect(result.older).toBeUndefined();
  });

  it("skips external articles", () => {
    const result = findAdjacentArticles(articles, "/blog/article-3");
    expect(result.older?.href).toBe("/blog/article-2");
    expect(result.older?.title).toBe("Article 2 (middle)");
  });

  it("returns both undefined for a non-existent href", () => {
    const result = findAdjacentArticles(articles, "/blog/non-existent");
    expect(result.newer).toBeUndefined();
    expect(result.older).toBeUndefined();
  });
});
