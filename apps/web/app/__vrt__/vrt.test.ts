import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const screenshot = async (page: Page, targetPage: TargetPage, colorMode: "light" | "dark") => {
  await page.goto(targetPage.path);
  await page.waitForLoadState("networkidle");

  if (colorMode === "dark") {
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
  }

  await expect(page).toHaveScreenshot({ fullPage: true });
};

interface TargetPage {
  name: string;
  path: string;
}

const targetPages: TargetPage[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "behavior",
    path: "/behavior",
  },
  {
    name: "articles",
    path: "/articles",
  },
  {
    name: "article-2022-summary",
    path: "/articles/2022-summary",
  },
  {
    name: "testing-markdown-renderer",
    path: "/dev/testing-markdown-renderer",
  },
];

for (const targetPage of targetPages) {
  test(`${targetPage.name}-light`, async ({ page }) => await screenshot(page, targetPage, "light"));
  test(`${targetPage.name}-dark`, async ({ page }) => await screenshot(page, targetPage, "dark"));
}
