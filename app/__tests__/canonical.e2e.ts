import { expect, test } from "@playwright/test";

const cases = [
  { path: "/", expected: "https://mh4gf.dev" },
  { path: "/blog", expected: "https://mh4gf.dev/blog" },
  {
    path: "/blog/testing-markdown-renderer",
    expected: "https://mh4gf.dev/blog/testing-markdown-renderer",
  },
  { path: "/media", expected: "https://mh4gf.dev/media" },
  { path: "/behavior", expected: "https://mh4gf.dev/behavior" },
  { path: "/resume", expected: "https://mh4gf.dev/resume" },
  { path: "/tags/nextjs", expected: "https://mh4gf.dev/tags/nextjs" },
];

test.describe("canonical URL", () => {
  for (const { path, expected } of cases) {
    test(`${path} points to ${expected}`, async ({ page }) => {
      await page.goto(path);
      const href = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(href).toBe(expected);
    });
  }
});
