import { test, expect } from '@playwright/test';

test.describe('should switch dark/light mode', () => {

  test('should switch to light to dark mode', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    
    //setting initial mode to light
    await page.evaluate(() => localStorage.setItem('color-theme', 'light'));

    await page.locator("nav #darkModeToggleButton").click()
    const finalMode = await page.evaluate(() => localStorage.getItem('color-theme'));
    await expect(finalMode).toEqual('dark');
  });

});