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
    // 日付のみの文字列（YYYY-MM-DD）は UTC 深夜 00:00 として parse される。
    // UTC より進んだタイムゾーン（UTC+14 の Kiribati が最大）で「今日」の日付を入力すると、
    // その UTC 深夜時刻は実行環境の Date.now() より最大 14 時間先になり得るため、
    // 地球上のどのタイムゾーンの「今日」でも未来日と誤判定しないよう許容幅を設ける
    const maxAllowedTime = Date.now() + 14 * 60 * 60 * 1000;
    for (const article of externalArticles) {
      const time = new Date(article.publishedAt).getTime();
      expect(Number.isNaN(time)).toBe(false);
      expect(time).toBeLessThanOrEqual(maxAllowedTime);
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
