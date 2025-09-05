import { test, expect } from '@playwright/test';

test.use({storageState: 'playwright/.auth/user.json'});

test.describe('should create a new upvote', () => {

    test('should create a new upvote correctly (at least 1 review and restaurant published)', async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.locator("#homepage button").click();
        await page.locator("#restaurantsList button#goTo").nth(0).click();
        //the first review with "user" as substring
        await page.locator('#reviewsList div', { hasText: /user/ }).nth(0).locator('button#upvote').click();
        await expect(page.getByText(/created/)).toBeVisible();
    });
});