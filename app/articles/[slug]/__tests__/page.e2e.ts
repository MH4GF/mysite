import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const setup = async (page: Page, path: string) => {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
};

test("/articles/testing-markdown-renderer", async ({ page }) => {
  await setup(page, "/articles/testing-markdown-renderer");

  await expect(page.getByRole("heading", { name: "見出し" })).toBeVisible();
  await expect(page.getByRole("link", { name: "アンカーテキスト" })).toBeVisible();
  await expect(page.getByRole("link", { name: "https://mh4gf.dev/contents" })).toBeVisible();
  await expect(page.getByRole("region", { name: "About | Hirotaka Miyagi" })).toBeVisible();
});

test.describe("Ask AI Dropdown", () => {
  const articlePath = "/articles/testing-markdown-renderer";

  const setupArticle = async (page: Page) => {
    await page.goto(articlePath);
    await page.getByRole("button", { name: "Ask AI" }).waitFor({ state: "visible" });
  };

  test("Markdown endpoint returns plain text", async ({ page }) => {
    const response = await page.goto(`${articlePath}.md`);
    expect(response?.headers()["content-type"]).toContain("text/plain");
    const content = await response?.text();
    expect(content).toContain("# 見出し");
  });

  test("Opens dropdown and shows all menu items", async ({ page }) => {
    await setupArticle(page);

    await page.getByRole("button", { name: "Ask AI" }).click();
    await expect(page.getByRole("button", { name: "Markdownをコピー" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Markdownを開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "ChatGPTで開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Claudeで開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Scira AIで開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "T3 Chatで開く" })).toBeVisible();
  });

  test("Open Markdown link has correct href", async ({ page }) => {
    await setupArticle(page);

    await page.getByRole("button", { name: "Ask AI" }).click();
    const openMarkdownLink = page.getByRole("link", { name: "Markdownを開く" });
    await expect(openMarkdownLink).toHaveAttribute(
      "href",
      /\/articles\/testing-markdown-renderer\.md$/,
    );
  });

  test("AI service links have correct query format", async ({ page }) => {
    await setupArticle(page);

    await page.getByRole("button", { name: "Ask AI" }).click();

    const chatGptLink = page.getByRole("link", { name: "ChatGPTで開く" });
    await expect(chatGptLink).toHaveAttribute("href", /chatgpt\.com.*hints=search/);

    const claudeLink = page.getByRole("link", { name: "Claudeで開く" });
    await expect(claudeLink).toHaveAttribute("href", /claude\.ai\/new\?q=/);

    const sciraLink = page.getByRole("link", { name: "Scira AIで開く" });
    await expect(sciraLink).toHaveAttribute("href", /scira\.ai.*q=/);

    const t3Link = page.getByRole("link", { name: "T3 Chatで開く" });
    await expect(t3Link).toHaveAttribute("href", /t3\.chat\/new\?q=/);
  });

  test("Copy Markdown copies content to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await setupArticle(page);

    await page.getByRole("button", { name: "Ask AI" }).click();
    await page.getByRole("button", { name: "Markdownをコピー" }).click();

    await expect(page.getByRole("button", { name: "コピーしました" })).toBeVisible();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toContain("# 見出し");
  });
});

test.describe("Command Palette", () => {
  test("Open and close with mouse", async ({ page }) => {
    await setup(page, "/");
    await page.getByRole("button", { name: "Open command palette" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("Open and close with keyboard", async ({ page }) => {
    await setup(page, "/");
    await page.locator("body").press("ControlOrMeta+k");
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByPlaceholder("Type a command or search...").press("ControlOrMeta+k");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("Navigate to All Contents", async ({ page }) => {
    await setup(page, "/");
    await page.getByRole("button", { name: "Open command palette" }).click();
    await page.getByRole("option", { name: "All Contents" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("heading", { name: "All Contents" })).toBeVisible();
  });

  test("Navigate to `Source of this site` on another tab", async ({ page }) => {
    await setup(page, "/");
    await page.getByRole("button", { name: "Open command palette" }).click();

    const otherPagePromise = page.waitForEvent("popup");
    await page.getByRole("option", { name: "Source of this site - MH4GF/" }).click();
    const otherPage = await otherPagePromise;

    await expect(otherPage.getByText("MH4GF / mysite Public")).toBeVisible();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("Navigate to All Contents with Enter key", async ({ page }) => {
    await setup(page, "/");
    await page.locator("body").press("ControlOrMeta+k");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("heading", { name: "All Contents" })).toBeVisible();
  });

  test("Navigate to `Source of this site` with Enter key", async ({ page }) => {
    await setup(page, "/");
    await page.locator("body").press("ControlOrMeta+k");

    const otherPagePromise = page.waitForEvent("popup");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    const otherPage = await otherPagePromise;

    await expect(otherPage.getByText("MH4GF / mysite Public")).toBeVisible();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
