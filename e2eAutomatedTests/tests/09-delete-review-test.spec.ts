import { test, expect } from '@playwright/test';

test.use({storageState: 'playwright/.auth/user.json'});

test.describe('should delete an user review', () => {
  
  test('should successfully delete a review (at least 1 review published)', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Reviews' }).click();
    await page.locator("button#delete").nth(0).click();
    await expect(page.getByText(/removed/)).toBeVisible();
  });
});