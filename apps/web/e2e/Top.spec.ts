import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const setup = async (page: Page) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
}

test('/', async ({ page }) => {
  await setup(page)

  expect(page.getByRole('heading', { name: 'Hirotaka Miyagi' }))
  await expect(page).toHaveScreenshot()
})
