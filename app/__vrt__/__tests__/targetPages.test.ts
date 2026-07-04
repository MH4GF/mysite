import { describe, expect, it } from "vitest";
import { TARGET_PAGES } from "../targetPages";

describe("TARGET_PAGES", () => {
  it("すべてのエントリがルート相対パスを持つ", () => {
    for (const targetPage of TARGET_PAGES) {
      expect(targetPage.path).toMatch(/^\//);
    }
  });

  it("name が VRT スナップショット名として一意である", () => {
    const names = TARGET_PAGES.map((targetPage) => targetPage.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("path が重複していない", () => {
    const paths = TARGET_PAGES.map((targetPage) => targetPage.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("opengraph-image のエントリのみ isOpengraphImage フラグを持つ", () => {
    for (const targetPage of TARGET_PAGES) {
      expect(targetPage.isOpengraphImage ?? false).toBe(
        targetPage.path.endsWith("/opengraph-image"),
      );
    }
  });
});
