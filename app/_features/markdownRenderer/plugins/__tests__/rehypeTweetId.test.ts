import type { Root } from "hast";
import { describe, expect, it } from "vitest";
import { rehypeTweetId } from "../rehypeTweetId";

const run = (tree: Root): Root => {
  rehypeTweetId()(tree);
  return tree;
};

const blockquote = (
  className: string[],
  children: Root["children"][number][],
): Root["children"][number] => ({
  type: "element",
  tagName: "blockquote",
  properties: { className },
  children: children as never,
});

const anchor = (href: string): Root["children"][number] => ({
  type: "element",
  tagName: "a",
  properties: { href },
  children: [{ type: "text", value: "link" }],
});

describe("rehypeTweetId", () => {
  it("sets dataTweetId when twitter-tweet blockquote has a status link", () => {
    const tree: Root = {
      type: "root",
      children: [
        blockquote(
          ["twitter-tweet"],
          [
            anchor("https://t.co/abc"),
            anchor("https://twitter.com/MH4GF/status/1717172182798000500?ref_src=twsrc%5Etfw"),
          ],
        ),
      ],
    };

    run(tree);

    const bq = tree.children[0];
    if (bq?.type !== "element") {
      throw new Error("unexpected");
    }
    expect(bq.properties.dataTweetId).toBe("1717172182798000500");
  });

  it("matches x.com domain", () => {
    const tree: Root = {
      type: "root",
      children: [blockquote(["twitter-tweet"], [anchor("https://x.com/MH4GF/status/1234567890")])],
    };

    run(tree);

    const bq = tree.children[0];
    if (bq?.type !== "element") {
      throw new Error("unexpected");
    }
    expect(bq.properties.dataTweetId).toBe("1234567890");
  });

  it("uses the last status link when multiple are present", () => {
    const tree: Root = {
      type: "root",
      children: [
        blockquote(
          ["twitter-tweet"],
          [
            anchor("https://twitter.com/foo/status/111"),
            anchor("https://twitter.com/bar/status/222"),
          ],
        ),
      ],
    };

    run(tree);

    const bq = tree.children[0];
    if (bq?.type !== "element") {
      throw new Error("unexpected");
    }
    expect(bq.properties.dataTweetId).toBe("222");
  });

  it("leaves non-twitter-tweet blockquotes untouched", () => {
    const tree: Root = {
      type: "root",
      children: [blockquote(["regular-quote"], [anchor("https://twitter.com/MH4GF/status/999")])],
    };

    run(tree);

    const bq = tree.children[0];
    if (bq?.type !== "element") {
      throw new Error("unexpected");
    }
    expect(bq.properties.dataTweetId).toBeUndefined();
  });

  it("does not set dataTweetId when twitter-tweet has no status link", () => {
    const tree: Root = {
      type: "root",
      children: [blockquote(["twitter-tweet"], [anchor("https://example.com/unrelated")])],
    };

    run(tree);

    const bq = tree.children[0];
    if (bq?.type !== "element") {
      throw new Error("unexpected");
    }
    expect(bq.properties.dataTweetId).toBeUndefined();
  });

  it("walks nested children to find status links", () => {
    const tree: Root = {
      type: "root",
      children: [
        blockquote(
          ["twitter-tweet"],
          [
            {
              type: "element",
              tagName: "p",
              properties: {},
              children: [anchor("https://twitter.com/foo/status/42")],
            } as never,
          ],
        ),
      ],
    };

    run(tree);

    const bq = tree.children[0];
    if (bq?.type !== "element") {
      throw new Error("unexpected");
    }
    expect(bq.properties.dataTweetId).toBe("42");
  });
});
