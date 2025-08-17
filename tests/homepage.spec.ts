import { test, expect } from '@playwright/test';

test('Footer text checking', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('div.bg-black small span')).toHaveText('©2025 Fast Ventures srl | Via Paolo Pallia 3, 20139, Milano | P.IVA/C.F. 08395780961 | Equity 50,000 €');});
