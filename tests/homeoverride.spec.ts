// @ts-check
import { test, expect } from '@playwright/test';
import MainMenuPage from '@poms/frontend/override/mainmenu.page';

test('Verify_mini_cart_can_be_opened', { tag: ['@homepage', '@cold'] }, async ({ page }) => {
  const mainmenu = new MainMenuPage(page);

  await page.goto('');

  await mainmenu.openMiniCart();

  await expect(mainmenu.minicartWrapper).toBeVisible({ timeout: 15000 });

  await expect(page.locator('.minicart-wrapper .title-tab-block')).toBeVisible();
});
