import { expect, test } from "@playwright/test";

test("platform.twitter.com is not requested on top page", async ({ page }) => {
  const twitterRequests: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("platform.twitter.com") || url.includes("platform.x.com")) {
      twitterRequests.push(url);
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(twitterRequests).toEqual([]);
});

test("react-tweet renders on /blog/embed-tweet-with-app-router without widgets.js", async ({
  page,
}) => {
  const widgetsRequests: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("platform.twitter.com/widgets.js")) {
      widgetsRequests.push(url);
    }
  });

  await page.goto("/blog/embed-tweet-with-app-router");
  await page.waitForLoadState("networkidle");

  const tweetContainers = page.locator("div.react-tweet-theme");
  await expect(tweetContainers.first()).toBeVisible();

  expect(widgetsRequests).toEqual([]);
});
