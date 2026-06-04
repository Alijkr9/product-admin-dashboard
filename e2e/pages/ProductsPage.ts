import {expect} from '@playwright/test';
import { type Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page : Page) {}

    ///---selectors---///

    private addProductButton = () => this.page.getByTestId('add-product-button');
    private productNameInput = () => this.page.getByTestId('product-name-input').locator('input');
    private productPriceInput = () => this.page.getByTestId('product-price-input').locator('input');
    private productCategoryInput = () => this.page.getByTestId('product-category-input').locator('input');
    private productDescriptionInput = () => 
        this.page.getByTestId('product-description-input').locator('textarea').first();
    private saveProductButton = () => this.page.getByTestId('save-product-button');
    private dialogTitle = () => this.page.getByText('Add New Product');

    ///---actions---///

    async navigate() {
        await this.page.goto('/products');
    }

    async openAddProductDialog() {
        await this.addProductButton().click();
        await expect(this.dialogTitle()).toBeVisible();
    }

    async fillProductDialog(product: { name: string; price: string; category: string; description: string;}) {
        await this.productNameInput().fill(product.name);
        await this.productPriceInput().fill(product.price);
        await this.productCategoryInput().fill(product.category);
        await this.productDescriptionInput().fill(product.description);
    }

    async submitForm() {
        await this.saveProductButton().click();
        await expect(this.dialogTitle()).not.toBeVisible({ timeout: 10000 });
    }

    async expectProductInTable(name: string, expectedPrice: string) {
        const row = this.page.getByRole('row').filter({hasText: name,});

        await expect(row).toBeVisible();
        await expect(row).toContainText(expectedPrice);

    }
}
