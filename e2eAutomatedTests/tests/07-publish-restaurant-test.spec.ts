import { test, expect } from '@playwright/test';
import path from 'path';

test.use({storageState: 'playwright/.auth/user.json'});

test.describe('should create a new restaurant', () => {

    test('should create a new restaurant correctly', async ({ page }) => {

        const filePath = path.resolve(__dirname, 'restaurant.jpg');

        await page.goto('http://localhost:4200/restaurant');
        await page.getByRole('link', { name: 'Restaurants' }).click();
        await page.getByText('Publish Restaurant').click();
        await page.getByLabel('Name').fill('The paginator');
        await page.getByLabel('Description').fill('A wonderful restaurant');
        await page.getByText('Choose file').click();
        await page.getByRole('button', { name: 'Upload image Choose file' }).setInputFiles(filePath);
        await page.locator('#publishRestaurantPage #map').click();
        await page.getByRole('button', { name: 'Publish' }).click();

        await expect(page).toHaveTitle("Restaurants", {timeout: 2000});
    });

});