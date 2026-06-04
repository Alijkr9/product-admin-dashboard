import { createBdd } from 'playwright-bdd';
import { ProductsPage } from '../pages/ProductsPage';
import { LoginPage } from '../pages/LoginPage';

const { Given, When, Then } = createBdd();

Given('I am logged in as admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillvalidCredentials();
    await loginPage.clickSubmit();
    await loginPage.expectRedirectedToDashboard();
});

Given('I am on the Products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigate();
});

When('I click on Add Product button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.openAddProductDialog();
});

When('I fill in the product name {string}, price {string}, category {string}, and description {string}',
    async ({ page }, name: string, price: string, category: string, description: string) => {
        const productsPage = new ProductsPage(page);
        await productsPage.fillProductDialog({ name, price, category, description });
    }
);

When('I click the "Save Product" button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.submitForm();
});

Then('I should see {string} in the table with the calculated price {string}',
    async ({ page }, name: string, expectedPrice: string) => {
        const productsPage = new ProductsPage(page);
        await productsPage.expectProductInTable(name, expectedPrice);
    }
);
