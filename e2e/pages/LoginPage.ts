import {expect, type Page} from '@playwright/test';

export class LoginPage {
    constructor(private page : Page) {}

    ///---selectors---///
    private usernameInput = () => this.page.getByTestId('login-username');
    private passwordInput = () => this.page.getByTestId('login-password');
    private submitButton = () => this.page.getByTestId('login-submit');
    private errorMessage = () => this.page.getByTestId('login-error');

    ///---actions---///
    async navigate() {
        await this.page.goto('/login');
    }

    async fillvalidCredentials() {
        await this.usernameInput().fill('admin');
        await this.passwordInput().fill('password');
    }

    async fillCredentials(username: string, password: string) {
        await this.usernameInput().fill(username);
        await this.passwordInput().fill(password);
    }

    async clickSubmit() {
        await this.submitButton().click();
    }

    async expectRedirectedToDashboard() {
        await expect(this.page).toHaveURL('/');
        await expect(this.page.getByTestId('dashboard-title')).toHaveText('Dashboard');
    }

    async expectErrorMessage() {
        await expect(this.errorMessage()).toBeVisible();
        await expect(this.errorMessage()).toHaveText('Invalid credentials');
    }

}
