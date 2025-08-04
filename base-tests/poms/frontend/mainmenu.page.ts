// @ts-check
import { expect, type Locator, type Page } from '@playwright/test';
import { UIReference, outcomeMarker, slugs } from '@config';

class MainMenuPage {
  readonly page: Page;
  readonly mainMenuAccountButton: Locator;
  readonly mainMenuMiniCartButton: Locator;
  readonly mainMenuMyAccountItem: Locator;
  readonly mainMenuLogoutItem: Locator;
  readonly minicartContentWrapper: Locator;
  readonly minicartCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainMenuAccountButton = page.locator('.header .account-link');
    this.mainMenuMiniCartButton = page.locator('.minicart-wrapper');
    this.mainMenuLogoutItem = page.locator('a[href*="/customer/account/logout"]');
    this.mainMenuMyAccountItem = page.locator('.nav.items a[href*="/customer/account"]').first();
    this.minicartContentWrapper = page.locator('#minicart-content-wrapper');
    this.minicartCloseButton = page.locator('#btn-minicart-close');
  }

  async gotoMyAccount() {
    await this.page.goto('/');
    await this.mainMenuAccountButton.click();
    await this.page.waitForSelector('.customer-menu', { state: 'visible' });
    await this.mainMenuMyAccountItem.click();
    await expect(this.page.locator('.page-title')).toHaveText(/Il mio Account|My Account/i);
  }

  async gotoAddressBook() {
    await this.page.goto('/');
    await this.mainMenuAccountButton.click();
    await this.page.waitForSelector('.nav.items', { state: 'visible' });
    await this.page.locator('.nav.items a[href*="/customer/address"]').click();
    await expect(this.page.locator('.page-title')).toContainText('Rubrica');
  }

  async openMiniCart() {
    await this.mainMenuMiniCartButton.waitFor({ state: 'visible' });
    await this.mainMenuMiniCartButton.click();
    await this.minicartContentWrapper.waitFor({ state: 'visible' });
  }

  async closeMiniCart() {
    await this.minicartCloseButton.waitFor({ state: 'visible' });
    await this.minicartCloseButton.click();
    await this.minicartContentWrapper.waitFor({ state: 'hidden' });
  }

  async logout() {
    await this.page.goto('/');
    await this.mainMenuAccountButton.click();
    await this.page.waitForSelector('.customer-menu', { state: 'visible' });
    await this.mainMenuLogoutItem.click();
    await expect(this.page.locator('.message-success')).toContainText('Sei stato disconnesso');
    await expect(this.mainMenuLogoutItem).toBeHidden();
  }
}

export default MainMenuPage;