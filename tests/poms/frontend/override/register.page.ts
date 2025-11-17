// @ts-check

import {expect, type Locator, type Page} from '@playwright/test';
import {UIReference, outcomeMarker, slugs} from '@config';

class RegisterPage {
    readonly page: Page;
    readonly accountCreationFirstNameField: Locator;
    readonly accountCreationLastNameField: Locator;
    readonly accountCreationEmailField: Locator;
    readonly accountCreationPasswordField: Locator;
    readonly accountCreationPasswordRepeatField: Locator;
    readonly accountCreationConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountCreationFirstNameField = page.getByPlaceholder(UIReference.personalInformation.firstNameLabel);
        this.accountCreationLastNameField = page.getByPlaceholder(UIReference.personalInformation.lastNameLabel);
        this.accountCreationEmailField = page.getByPlaceholder(UIReference.credentials.emailFieldLabel, {exact: true});
        this.accountCreationPasswordField = page.getByPlaceholder(UIReference.credentials.passwordFieldLabel, {exact: true});
        this.accountCreationPasswordRepeatField = page.getByPlaceholder(UIReference.credentials.passwordConfirmFieldLabel);
        this.accountCreationConfirmButton = page.getByRole('button', {name: UIReference.accountCreation.createAccountButtonLabel});
    }


    async createNewAccount(firstName: string, lastName: string, email: string, password: string, muted: boolean = false) {
        await this.page.goto(slugs.account.createAccountSlug);

        await this.accountCreationFirstNameField.fill(firstName);
        await this.accountCreationLastNameField.fill(lastName);
        await this.accountCreationEmailField.fill(email);
        await this.accountCreationPasswordField.fill(password);
        await this.accountCreationPasswordRepeatField.fill(password);
        await this.accountCreationConfirmButton.click();

        if (!muted) {
            // Assertions: Account created notification, navigated to account page, email visible on page
            await expect(this.page, 'Should be redirected to account overview page').toHaveURL(/customer\/account/);
        }
    }
}

export default RegisterPage;
