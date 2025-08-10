// @ts-check

import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UIReference, outcomeMarker, slugs } from '@config';

class ContactPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillOutForm() {
    await this.page.goto('/contact');

    const form = this.page.locator('form.contact');
    await form.waitFor({ state: 'visible', timeout: 15000 });

    await form.locator('input[name="firstname"]').fill(faker.person.firstName());
    await form.locator('input[name="lastname"]').fill(faker.person.lastName());
    await form.locator('input[name="email"]').fill(faker.internet.email());
    await form.locator('input[name="phone"]').fill(faker.phone.number());
    await form.locator('textarea[name="message"]').fill(faker.lorem.paragraph());

    await form.locator('select[name="country_id"]').selectOption({ value: 'ES' });
    await form.locator('select[name="contactreason"]').selectOption({ value: 'info-request' });

    await form.locator('#terms_and_conditions').check();

    const submitButton = form.locator('button[type="submit"]');

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await submitButton.scrollIntoViewIfNeeded();

    submitButton.click();

    const messageText = await message.innerText();
    if (messageText.includes('error')) {
      throw new Error(`Form submission failed: ${messageText}`);
    }
  }
}

export default ContactPage;
