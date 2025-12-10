import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

test.describe("Ask AI Dropdown on About Pages", () => {
  const aboutPath = "/resume";

  const setupAbout = async (page: Page) => {
    await page.goto(aboutPath);
    await page.getByRole("button", { name: "Ask AI" }).waitFor({ state: "visible" });
  };

  test("Markdown endpoint returns plain text", async ({ page }) => {
    const response = await page.goto(`${aboutPath}.md`);
    expect(response?.headers()["content-type"]).toContain("text/plain");
    const content = await response?.text();
    expect(content).toBeTruthy();
  });

  test("Opens dropdown and shows all menu items", async ({ page }) => {
    await setupAbout(page);

    await page.getByRole("button", { name: "Ask AI" }).click();
    await expect(page.getByRole("button", { name: "Markdownをコピー" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Markdownを開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "ChatGPTで開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Claudeで開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Scira AIで開く" })).toBeVisible();
    await expect(page.getByRole("link", { name: "T3 Chatで開く" })).toBeVisible();
  });

  test("Open Markdown link has correct href", async ({ page }) => {
    await setupAbout(page);

    await page.getByRole("button", { name: "Ask AI" }).click();
    const openMarkdownLink = page.getByRole("link", { name: "Markdownを開く" });
    await expect(openMarkdownLink).toHaveAttribute("href", /\/resume\.md$/);
  });

  test("AI service links have correct query format", async ({ page }) => {
    await setupAbout(page);

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
    await setupAbout(page);

    await page.getByRole("button", { name: "Ask AI" }).click();
    await page.getByRole("button", { name: "Markdownをコピー" }).click();

    await expect(page.getByRole("button", { name: "コピーしました" })).toBeVisible();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toBeTruthy();
  });
});
