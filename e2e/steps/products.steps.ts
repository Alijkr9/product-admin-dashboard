import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();


Given('I am logged into the dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password');
    await page.getByTestId('login-submit').click();

    // Safety check: ensure we are actually on the dashboard before starting the test
    await expect(page.getByTestId('dashboard-title')).toHaveText('Dashboard');
});


Given('I navigate to the {string} page', async ({ page }, pageName) => {

    await page.getByRole('button', { name: pageName }).click();

    // This ignores the sidebar link and looks for the title of the page
    const mainContent = page.locator('main');
    await expect(mainContent.getByText(pageName, { exact: true })).toBeVisible();
});


When('I click the {string} button', async ({ page }, buttonName) => {
    if (buttonName === 'Add Product') {
        await page.getByTestId('add-product-button').click();
    } else if (buttonName === 'Save Product') {
        await page.getByTestId('save-product-button').click();
    }
});


When('I fill in the product name {string}, price {string}, category {string}, and description {string}',
    async ({ page }, name, price, category, description) => {

        await page.getByTestId('product-name-input').locator('input').fill(name);
        await page.getByTestId('product-price-input').locator('input').fill(price);
        await page.getByTestId('product-category-input').locator('input').fill(category);

        // Only target the visible textarea to avoid the MUI hidden shadow element
        await page.getByTestId('product-description-input').locator('textarea:visible').fill(description);
    });


Then('I should see {string} in the table with the calculated price {string}', async ({ page }, name, expectedPrice) => {

    // We search for a row that contains our specific product name
    const row = page.locator('.MuiDataGrid-row', { hasText: name });

    await expect(row).toBeVisible();

    await expect(row).toContainText(expectedPrice);
});