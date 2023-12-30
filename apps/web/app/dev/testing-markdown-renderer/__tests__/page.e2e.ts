import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const setup = async (page: Page) => {
  await page.goto("/dev/testing-markdown-renderer");
  await page.waitForLoadState("networkidle");
};

test("/dev/testing-markdown-renderer", async ({ page }) => {
  await setup(page);

  await expect(page.getByRole("heading", { name: "見出し" })).toBeVisible();
  await expect(page.getByRole("link", { name: /アンカーテキスト/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "https://mh4gf.dev/articles" })).toBeVisible();
  await expect(page.getByRole("region", { name: "MH4GF | Hirotaka Miyagi" })).toBeVisible();
});
