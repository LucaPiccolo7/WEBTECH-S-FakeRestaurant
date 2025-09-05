import { test, expect } from '@playwright/test';

test.describe('should login an user', () => {

  test('should login with correct credentials', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByLabel('Username').fill('usertest');
    await page.getByLabel('Password').fill('passwordtest');
    await page.getByRole('button', { name: 'Sign-in' }).click();
    await expect(page).toHaveTitle("Home", {timeout: 5000});
  });

});