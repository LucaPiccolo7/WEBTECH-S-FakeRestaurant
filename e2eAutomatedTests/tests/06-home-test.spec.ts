import { test, expect } from '@playwright/test';

test.describe('should go to home', () => {

  test('should go to home correctly', async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    await page.locator("nav #homeButton").click();
    await expect(page).toHaveTitle("Home");
  });
});
