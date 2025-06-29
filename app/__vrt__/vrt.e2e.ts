// biome-ignore lint/correctness/noNodejsModules: Test file needs Node.js modules
import fs from "node:fs";

import { AxeBuilder } from "@axe-core/playwright";
import type { Page, TestInfo } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { createHtmlReport } from "axe-html-reporter";

const waitForBlurEnterContent = async (page: Page) => {
  await page.evaluate(() => {
    return new Promise<void>((resolve) => {
      const animationContainers = document.querySelectorAll(".blur-enter-content");
      if (animationContainers.length === 0) {
        resolve();
        return;
      }

      setTimeout(() => resolve(), 2000);
    });
  });
};

const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await waitForBlurEnterContent(page);
};

const maskFlakyElements = async (page: Page, selectors: string[]) => {
  const selector = selectors.join(", ");
  await page.addStyleTag({ content: `${selector} { opacity: 0; }` });
};

const testA11y = async (page: Page, testName: string) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  const reportHtml = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: testName,
      doNotCreateReportFile: true,
    },
  });
  if (!fs.existsSync("axe-html-report")) {
    fs.mkdirSync("axe-html-report");
  }
  fs.writeFileSync(`axe-html-report/${testName}.html`, reportHtml);

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
    await page.getByRole("button", { name: "Open command palette" }).click();
    await page.getByRole("option", { name: "Change to Dark Mode" }).click();
    await page.getByRole("button", { name: "Close" }).click();
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

const run = async (page: Page, testInfo: TestInfo, targetPage: TargetPage) => {
  const { testName: lightTestName } = await setup(page, testInfo, targetPage, "light");
  await Promise.all([testA11y(page, lightTestName), screenshot(page, lightTestName)]);

  const { testName: darkTestName } = await setup(page, testInfo, targetPage, "dark");
  await Promise.all([testA11y(page, darkTestName), screenshot(page, darkTestName)]);
};

test("home", async ({ page }, testInfo) => {
  await run(page, testInfo, { name: "home", path: "/" });
});

test("behavior", async ({ page }, testInfo) => {
  await run(page, testInfo, { name: "behavior", path: "/behavior" });
});

test("contents", async ({ page }, testInfo) => {
  await run(page, testInfo, { name: "contents", path: "/contents" });
});

test("2024-development-wordpress-theme", async ({ page }, testInfo) => {
  await run(page, testInfo, {
    name: "2024-development-wordpress-theme",
    path: "/articles/2024-development-wordpress-theme",
  });
});

test("testing-markdown-renderer", async ({ page }, testInfo) => {
  await run(page, testInfo, {
    name: "testing-markdown-renderer",
    path: "/articles/testing-markdown-renderer",
  });
});

// Note: テーマの概念がないページは今のところopengraph-imageのみのため、一旦ここに記述
test("opengraph-image", async ({ page }, testInfo) => {
  const targetPage = {
    name: "opengraph-image",
    path: "/articles/embed-tweet-with-app-router/opengraph-image",
  };
  const testName = formatTestName(testInfo, targetPage, "light");
  await screenshot(page, testName);
});
