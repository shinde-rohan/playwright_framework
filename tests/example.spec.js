const { test, expect } = require('@playwright/test');

test('basic navigation test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});