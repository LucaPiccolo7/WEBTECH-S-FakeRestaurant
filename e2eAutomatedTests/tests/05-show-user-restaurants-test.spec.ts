import { test, expect } from '@playwright/test';

test.use({storageState: 'playwright/.auth/user.json'});

test.describe('should show all user\'s restaurants', () => {

  test('should show user\'s restaurants page', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Restaurants' }).click();
    await expect(page.getByText('Your Restaurants')).toBeVisible();
  });
});