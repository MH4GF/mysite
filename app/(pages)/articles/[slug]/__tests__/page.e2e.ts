import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const setup = async (page: Page, path: string) => {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
};

test("/articles/testing-markdown-renderer", async ({ page }) => {
  await setup(page, "/articles/testing-markdown-renderer");

  await expect(page.getByRole("heading", { name: "見出し" })).toBeVisible();
  await expect(page.getByRole("link", { name: /アンカーテキスト/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "https://mh4gf.dev/articles" })).toBeVisible();
  await expect(page.getByRole("region", { name: "About | Hirotaka Miyagi" })).toBeVisible();
  await expect(
    page.frameLocator("iframe#twitter-widget-0").getByText("誕生日ボーイ"),
  ).toBeVisible();
});

test("Command Palette", async ({ page }) => {
  await setup(page, "/");

  await test.step("Open and close with mouse", async () => {
    await page.getByRole("button", { name: "Open command palette" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  await test.step("Open and close with keyboard", async () => {
    await page.locator("body").press("ControlOrMeta+k");
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByPlaceholder("Type a command or search...").press("ControlOrMeta+k");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  await test.step("Navigate to All Writing", async () => {
    await page.getByRole("button", { name: "Open command palette" }).click();
    await page.getByRole("link", { name: "All Writing" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("heading", { name: "Articles RSS" })).toBeVisible();
  });
});
