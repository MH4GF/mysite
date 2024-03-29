import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const setup = async (page: Page) => {
  await page.goto("/articles/testing-markdown-renderer");
  await page.waitForLoadState("networkidle");
};

test("/articles/testing-markdown-renderer", async ({ page }) => {
  await setup(page);

  await expect(page.getByRole("heading", { name: "見出し" })).toBeVisible();
  await expect(page.getByRole("link", { name: /アンカーテキスト/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "https://mh4gf.dev/articles" })).toBeVisible();
  await expect(page.getByRole("region", { name: "About | Hirotaka Miyagi" })).toBeVisible();
  await expect(
    page.frameLocator("iframe#twitter-widget-0").getByText("誕生日ボーイ"),
  ).toBeVisible();
});
