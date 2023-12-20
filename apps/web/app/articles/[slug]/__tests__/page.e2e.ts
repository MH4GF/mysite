import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const setup = async (page: Page) => {
  await page.goto("/articles/2022-summary");
  await page.waitForLoadState("networkidle");
};

test("/articles/[id]", async ({ page }) => {
  await setup(page);

  await expect(page).toHaveScreenshot();
});
