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
  await expect(page.getByRole("link", { name: "https://mh4gf.dev/articles" })).toBeVisible();
  await expect(page.getByRole("region", { name: "About | Hirotaka Miyagi" })).toBeVisible();
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
