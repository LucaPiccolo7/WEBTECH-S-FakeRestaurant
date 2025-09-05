import test, { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('login', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Username').fill('usertest');
  await page.getByLabel('Password').fill('passwordtest');
  await page.getByRole('button', { name: 'Sign-in' }).click();
  await expect(page).toHaveTitle("Home", {timeout: 5000});

  await page.context().storageState({ path: authFile });
});