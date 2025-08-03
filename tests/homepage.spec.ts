import { test, expect } from '@playwright/test';

test('Footer text checking', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.copyright .copyright-first')).toHaveText('©2025 Fast Ventures srl | Via Paolo Pallia 3, 20139, Milano | VAT 08395780961 | REA MI-2023175 | Equity € 50,000 IV');
});
