import { describe, expect, it } from "vitest";
import { tagLabelMap } from "../constants";
import { tagList } from "../type";

describe("tagLabelMap", () => {
  it("has a non-empty label for every tag defined in tagList", () => {
    for (const tag of tagList) {
      expect(tagLabelMap[tag]).toBeTypeOf("string");
      expect(tagLabelMap[tag].length).toBeGreaterThan(0);
    }
  });

  it("does not define labels for tags outside of tagList", () => {
    const tagListSet = new Set<string>(tagList);
    const mapKeys = Object.keys(tagLabelMap);
    expect(mapKeys.every((key) => tagListSet.has(key))).toBe(true);
    expect(mapKeys.length).toBe(tagList.length);
  });

  it("maps known tags to their expected display label", () => {
    expect(tagLabelMap.nextjs).toBe("Next.js");
    expect(tagLabelMap["generative-ai"]).toBe("Generative AI");
    expect(tagLabelMap.zenn).toBe("Zenn");
  });
});
