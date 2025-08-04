// @ts-check
import { expect, type Locator, type Page } from '@playwright/test';
import { UIReference, outcomeMarker, slugs } from '@config';

class RegisterPage {
  readonly page: Page;
  readonly form: Locator;
  readonly accountCreationFirstNameField: Locator;
  readonly accountCreationLastNameField: Locator;
  readonly accountCreationEmailField: Locator;
  readonly accountCreationPasswordField: Locator;
  readonly accountCreationPasswordRepeatField: Locator;
  readonly accountCreationConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('#form-validate');

    this.accountCreationFirstNameField = this.form.locator('#firstname');
    this.accountCreationLastNameField = this.form.locator('#lastname');
    this.accountCreationEmailField = this.form.locator('#email_address');
    this.accountCreationPasswordField = this.form.locator('#password');
    this.accountCreationPasswordRepeatField = this.form.locator('#password-confirmation');
    this.accountCreationConfirmButton = this.form.locator('#send2');
  }

  async createNewAccount(firstName: string, lastName: string, email: string, password: string, isSetup: boolean = false) {
    await this.page.goto(slugs.account.createAccountSlug);
    await this.form.waitFor({ state: 'visible', timeout: 15000 });

    await this.accountCreationFirstNameField.fill(firstName);
    await this.accountCreationLastNameField.fill(lastName);
    await this.accountCreationEmailField.fill(email);
    await this.accountCreationPasswordField.fill(password);
    await this.accountCreationPasswordRepeatField.fill(password);

    await Promise.all([
      this.page.waitForNavigation({ timeout: 30000 }),
      this.accountCreationConfirmButton.click()
    ]);

    if (!isSetup) {
      try {
        await expect(this.page).toHaveURL(new RegExp('.+' + slugs.account.accountOverviewSlug.replace(/\/$/, '')), {
          timeout: 10000
        });

      } catch (error) {
        throw error;
      }
    }
  }
}

export default RegisterPage;
