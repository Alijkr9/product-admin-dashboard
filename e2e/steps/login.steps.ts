import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';

const { Given, When, Then } = createBdd();

Given('I am on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

});

When('I enter valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillvalidCredentials();
});

When('I enter username {string} and password {string}',
    async ({ page }, username: string, password: string) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillCredentials(username, password);
    }
);

When('I click the submit button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickSubmit();
});

Then('I should be redirected to the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectRedirectedToDashboard();
});

Then('I should see an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectErrorMessage();
});
