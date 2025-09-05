import { test, expect } from '@playwright/test';

test.use({storageState: 'playwright/.auth/user.json'});

test.describe('should create a new review', () => {

    test('should create a new review correctly (at least 1 restaurant published)', async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.locator("#homepage #searchButton").click();
        await page.locator("#restaurantsList button#goTo").nth(0).click();
        await page.getByLabel(/review/).fill('My review');
        await page.getByRole('button', {name: 'Publish'}).click();
        await expect(page.getByText(/created/)).toBeVisible();
    });
});