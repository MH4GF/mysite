import AxeBuilder from "@axe-core/playwright";
import type { Page, TestInfo } from "@playwright/test";
import { expect, test } from "@playwright/test";

const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
};

const maskFlakyElements = async (page: Page, selectors: string[]) => {
  const selector = selectors.join(", ");
  await page.addStyleTag({ content: `${selector} { opacity: 0; }` });
};

const testA11y = async (page: Page) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
};

const formatTestName = (testInfo: TestInfo, targetPage: TargetPage, colorMode: "light" | "dark") =>
  `${targetPage.name}-${testInfo.project.name}-${colorMode}`;

const setup = async (
  page: Page,
  testInfo: TestInfo,
  targetPage: TargetPage,
  colorMode: "light" | "dark",
) => {
  await page.goto(targetPage.path);
  if (colorMode === "dark") {
    await page.getByRole("button", { name: "テーマ切り替え" }).click();
  }
  await maskFlakyElements(page, [
    `[data-testid="rich-link-card"] img`, // リンクカードの画像は外部サービスに依存しFlakyなため除外
  ]);
  await waitForPageReady(page);
  const testName = formatTestName(testInfo, targetPage, colorMode);

  return { testName };
};

const screenshot = async (page: Page, testName: string) => {
  await page.screenshot({
    fullPage: true,
    path: `app/__vrt__/screenshots/${testName}.png`,
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
  test(`${targetPage.name}-light`, async ({ page }, testInfo) => {
    const { testName } = await setup(page, testInfo, targetPage, "light");
    await Promise.all([testA11y(page), screenshot(page, testName)]);
  });
  test(`${targetPage.name}-dark`, async ({ page }, testInfo) => {
    const { testName } = await setup(page, testInfo, targetPage, "dark");
    await Promise.all([testA11y(page), screenshot(page, testName)]);
  });
}

// Note: テーマの概念がないページは今のところopengraph-imageのみのため、一旦ここに記述
test("opengraph-image", async ({ page }, testInfo) => {
  const targetPage = {
    name: "opengraph-image",
    path: "/articles/embed-tweet-with-app-router/opengraph-image",
  };
  const testName = formatTestName(testInfo, targetPage, "light");
  await screenshot(page, testName);
});
