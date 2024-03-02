import type { Page, TestInfo } from "@playwright/test";
import { test } from "@playwright/test";

const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
};

const screenshot = async (
  page: Page,
  testInfo: TestInfo,
  targetPage: TargetPage,
  colorMode: "light" | "dark",
) => {
  await page.goto(targetPage.path);

  if (colorMode === "dark") {
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
  }

  await waitForPageReady(page);

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
    path: "/articles/testing-markdown-renderer",
  },
];

for (const targetPage of targetPages) {
  test(`${targetPage.name}-light`, async ({ page }, testInfo) =>
    await screenshot(page, testInfo, targetPage, "light"));
  test(`${targetPage.name}-dark`, async ({ page }, testInfo) =>
    await screenshot(page, testInfo, targetPage, "dark"));
}

// Note: テーマの概念がないページは今のところopengraph-imageのみのため、一旦ここに記述
test("opengraph-image", async ({ page }, testInfo) => {
  const targetPage = {
    name: "opengraph-image",
    path: "/articles/embed-tweet-with-app-router/opengraph-image",
  };
  await screenshot(page, testInfo, targetPage, "light");
});
