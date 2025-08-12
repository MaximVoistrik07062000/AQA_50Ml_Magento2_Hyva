// @ts-check

import { expect, type Locator, type Page } from '@playwright/test';
import { UIReference, slugs } from '@config';

class LoginPage {
  readonly page: Page;
  readonly loginEmailField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginEmailField = page.locator('input[name="login[username]"]');
    this.loginPasswordField = page.locator('input[name="login[password]"]');
    this.loginButton = page.locator('button[name="send"]');
  }

  async login(email: string, password: string) {
    await this.page.goto(slugs.account.loginSlug);
    await this.loginEmailField.fill(email);
    await this.loginPasswordField.fill(password);
    await this.loginButton.press("Enter");
    await this.page.waitForLoadState('networkidle');
  }

  async loginExpectError(email: string, password: string, errorMessage: string) {
    await this.page.goto(slugs.account.loginSlug);
    await this.loginEmailField.fill(email);
    await this.loginPasswordField.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');

    await expect(this.page, 'Should stay on login page').toHaveURL(new RegExp(slugs.account.loginSlug));

    if (errorMessage) {
      const errorLocator = this.page.locator('.message.error span[x-html="message.text"]');
      await expect(errorLocator).toBeVisible();
    }
  }
}

export default LoginPage;
