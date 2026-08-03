import { describe, expect, it } from "vitest";
import { articlesMetaSchema, tagsSchema } from "../type";

describe("tagsSchema", () => {
  it("parses a known tag", () => {
    expect(tagsSchema.parse("react")).toBe("react");
  });

  it("rejects an unknown tag", () => {
    expect(tagsSchema.safeParse("not-a-real-tag").success).toBe(false);
  });
});

describe("articlesMetaSchema", () => {
  it("parses a valid list of article meta, coercing publishedAt to a Date", () => {
    const result = articlesMetaSchema.parse([
      {
        title: "Sample Article",
        href: "/blog/sample-article",
        externalLink: false,
        publishedAt: "2024-01-15",
        tags: ["react", "typescript"],
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0]?.publishedAt).toBeInstanceOf(Date);
    expect(result[0]?.tags).toStrictEqual(["react", "typescript"]);
  });

  it("rejects an article with an invalid tag", () => {
    const result = articlesMetaSchema.safeParse([
      {
        title: "Sample Article",
        href: "/blog/sample-article",
        externalLink: false,
        publishedAt: "2024-01-15",
        tags: ["not-a-real-tag"],
      },
    ]);

    expect(result.success).toBe(false);
  });

  it("rejects an article missing a required field", () => {
    const result = articlesMetaSchema.safeParse([
      {
        title: "Sample Article",
        externalLink: false,
        publishedAt: "2024-01-15",
        tags: [],
      },
    ]);

    expect(result.success).toBe(false);
  });
});
