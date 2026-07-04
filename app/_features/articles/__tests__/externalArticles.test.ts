import { describe, expect, it } from "vitest";
import { externalArticles } from "../data/externalArticles";
import { articlesMetaSchema, tagList } from "../type";

describe("externalArticles", () => {
  it("conforms to articlesMetaSchema", () => {
    expect(() => articlesMetaSchema.parse(externalArticles)).not.toThrow();
  });

  it("marks every entry as an external link", () => {
    expect(externalArticles.every((article) => article.externalLink === true)).toBe(true);
  });

  it("has a unique href for every entry", () => {
    const hrefs = externalArticles.map((article) => article.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("has a valid, non-future publishedAt for every entry", () => {
    const now = Date.now();
    for (const article of externalArticles) {
      const time = new Date(article.publishedAt).getTime();
      expect(Number.isNaN(time)).toBe(false);
      expect(time).toBeLessThanOrEqual(now);
    }
  });

  it("only uses tags defined in tagList", () => {
    const knownTags = new Set<string>(tagList);
    for (const article of externalArticles) {
      for (const tag of article.tags) {
        expect(knownTags.has(tag)).toBe(true);
      }
    }
  });
});
