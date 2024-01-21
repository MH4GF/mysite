import type { Page, TestInfo } from "@playwright/test";
import { test } from "@playwright/test";

const screenshot = async (
  page: Page,
  testInfo: TestInfo,
  targetPage: TargetPage,
  colorMode: "light" | "dark",
) => {
  await page.goto(targetPage.path);
  await page.waitForLoadState("networkidle");

  if (colorMode === "dark") {
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
  }

  await page.screenshot({
    fullPage: true,
    path: `app/__vrt__/screenshots/${targetPage.name}-${testInfo.project.name}-${colorMode}.png`,
  });
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
  test(`${targetPage.name}-light`, async ({ page }, testInfo) =>
    await screenshot(page, testInfo, targetPage, "light"));
  test(`${targetPage.name}-dark`, async ({ page }, testInfo) =>
    await screenshot(page, testInfo, targetPage, "dark"));
}
