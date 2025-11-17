// @ts-check

import {expect, type Locator, type Page} from '@playwright/test';
import {UIReference, slugs} from '@config';

class CategoryPage {
    readonly page: Page;
    categoryPageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryPageTitle = this.page.getByRole('heading', {name: UIReference.categoryPage.categoryPageTitleText});
    }

    async goToCategoryPage() {
        await this.page.goto(slugs.categoryPage.categorySlug);

        this.page.waitForLoadState();
        await expect(this.categoryPageTitle).toBeVisible();
    }

    async sortProducts(attribute: string) {
        const sortButton = this.page.locator('.ds-sdk-sort-dropdown button');
        await sortButton.click();

        let optionText;
        switch (attribute) {
            case 'price':
                optionText = 'PRECIO MAS ALTO';
                break;
            default:
                optionText = attribute;
        }

        await this.page.getByText(optionText).click();

        const sortRegex = new RegExp(`\\?product_list_order=${attribute}_DESC$`);
        await this.page.waitForURL(sortRegex);

        const buttonText = await sortButton.textContent();
        expect(buttonText, `Sort button should now display ${optionText}`).toContain(optionText);

        expect(this.page.url(), `URL should contain ?product_list_order=${attribute}_DESC`).toContain(`product_list_order=${attribute}_DESC`);
    }

    async showMoreProducts() {
        const showMoreButton = this.page.getByRole('button', {name: UIReference.categoryPage.showMoreButtonLabel});
        const productGrid = this.page.locator(UIReference.categoryPage.productGridLocator);
        const initialAmount = await productGrid.locator(UIReference.categoryPage.productItemLocator).count();

        await showMoreButton.click();
        await this.page.waitForTimeout(3000);

        const finalAmount = await productGrid.locator(UIReference.categoryPage.productItemLocator).count();

        expect(finalAmount, `Amount of items should increase after clicking 'Mostrar mas'`).toBeGreaterThan(initialAmount);
    }

    async switchView() {
        const viewSwitcher = this.page.getByLabel(UIReference.categoryPage.viewSwitchLabel, {exact: true}).locator(UIReference.categoryPage.activeViewLocator);
        const activeView = await viewSwitcher.getAttribute('title');

        if (activeView == 'Grid') {
            await this.page.getByLabel(UIReference.categoryPage.viewListLabel).click();
        } else {
            await this.page.getByLabel(UIReference.categoryPage.viewGridLabel).click();
        }

        const viewRegex = /\?product_list_mode=list$/;
        await this.page.waitForURL(viewRegex);

        const newActiveView = await viewSwitcher.getAttribute('title');
        expect(newActiveView, `View (now ${newActiveView}) should be switched (old: ${activeView})`).not.toEqual(activeView);
        expect(this.page.url(), `URL should contain ?product_list_mode=${newActiveView?.toLowerCase()}`).toContain(`?product_list_mode=${newActiveView?.toLowerCase()}`);
    }
}

export default CategoryPage;
