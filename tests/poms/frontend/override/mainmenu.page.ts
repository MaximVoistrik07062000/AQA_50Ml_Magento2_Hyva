// @ts-check

import {expect, type Locator, type Page} from '@playwright/test';
import {UIReference, outcomeMarker, slugs} from '@config';

class MainMenuPage {
    readonly page: Page;
    readonly mainMenuAccountButton: Locator;
    readonly mainMenuMiniCartButton: Locator;
    readonly mainMenuLogoutItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainMenuAccountButton = page.getByLabel(UIReference.mainMenu.myAccountButtonLabel);
        this.mainMenuMiniCartButton = page.locator('#menu-cart-icon');
        this.mainMenuLogoutItem = page.getByLabel(UIReference.mainMenu.myAccountLogoutItem);
    }

    async gotoMyAccount() {
        await this.page.goto(slugs.productpage.simpleProductSlug);
        await this.mainMenuAccountButton.click();

        await expect(this.page.getByRole('heading', {name: UIReference.accountDashboard.accountDashboardTitleLabel})).toBeVisible();
    }

    async gotoAddressBook() {
        // create function to navigate to Address Book through the header menu links
    }

    async openMiniCart() {
        await this.page.waitForTimeout(3000);

        const cartAmountBubble = this.page.locator('#menu-cart-icon .cart-summary-block');

        await cartAmountBubble.waitFor({state: 'attached'});
        const amountInCart = await cartAmountBubble.innerText();

        await this.mainMenuMiniCartButton.waitFor();
        await this.mainMenuMiniCartButton.click({ force: true });

        let miniCartDrawer = this.page.locator('[aria-label="Mi cesta"]');

        await expect(miniCartDrawer).toBeVisible({timeout: 10000});
    }

    async logout() {
        await this.page.goto(slugs.account.accountOverviewSlug);
        await this.mainMenuAccountButton.click();
        const logoutButton = this.page.locator('[aria-label*="Cerrar sesión"], [title*="Cerrar sesión"]').first();
        await logoutButton.waitFor({state: 'visible', timeout: 10000});

        await logoutButton.click();

        //assertions: notification that user is logged out & logout button no longer visible
        await expect(this.page.getByText(outcomeMarker.logout.logoutConfirmationText, {exact: true})).toBeVisible();
        await expect(this.mainMenuLogoutItem).toBeHidden();
    }
}

export default MainMenuPage;
