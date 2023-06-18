import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const setup = async (page: Page) => {
  await page.goto('/behavior')
  await page.waitForLoadState('networkidle')
}

test('/[id]', async ({ page }) => {
  await setup(page)

  await expect(page).toHaveScreenshot()
})
