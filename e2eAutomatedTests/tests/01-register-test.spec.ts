import { test, expect } from '@playwright/test';

test.describe('should register a new user', () => {

  test('should create a new account', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByLabel('Username').fill('usertest');
    await page.getByLabel('Password').fill('passwordtest');
    await page.getByRole('button', { name: 'Sign-up' }).click();
    await expect(page).toHaveTitle("Sign-in", {timeout: 5000});
  });

})