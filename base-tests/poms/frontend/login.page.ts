// @ts-check
import { expect, type Locator, type Page } from '@playwright/test';
import { slugs } from '@config';
import MainmenuPage from '@poms/frontend/mainmenu.page';

class LoginPage {
  readonly page: Page;
  readonly loginEmailField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginEmailField = page.getByPlaceholder('Email');
    this.loginPasswordField = page.getByPlaceholder('Password');

    this.loginButton = page.getByRole('button', { name: /login/i });
  }

  async login(email: string, password: string) {
    await this.page.goto(slugs.account.loginSlug);

    await this.loginEmailField.fill(email);
    await this.loginPasswordField.fill(password);

    await this.loginButton.press("Enter");
  }

  async loginExpectError(email: string, password: string, errorMessage: string) {
    await this.page.goto(slugs.account.loginSlug);

    await this.loginEmailField.fill(email);
    await this.loginPasswordField.fill(password);
    await this.loginButton.press('Enter');
    await this.page.waitForLoadState('networkidle');

    await expect(this.page, 'Should stay on login page').toHaveURL(new RegExp(slugs.account.loginSlug));
  }
}

export default LoginPage;
