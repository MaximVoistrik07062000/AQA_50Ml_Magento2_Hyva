// @ts-check
import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

class ContactPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly messageField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const form = page.locator('#contact-form');

    this.firstNameField = form.locator('input[name="firstname"]');
    this.lastNameField = form.locator('input[name="lastname"]');
    this.emailField = form.locator('input[name="email"]');
    this.messageField = form.locator('textarea[name="message"]');
    this.submitButton = form.locator('button[type="submit"]');
  }

  async fillOutForm() {
    await this.firstNameField.fill(faker.person.firstName());
    await this.lastNameField.fill(faker.person.lastName());
    await this.emailField.fill(faker.internet.email());
    await this.messageField.fill(faker.lorem.paragraph());

    await this.submitButton.click();
  }
}

export default ContactPage;
