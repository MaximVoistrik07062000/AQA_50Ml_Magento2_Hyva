// @ts-check
import { test, expect } from '@playwright/test';
import MainMenuPage from '@poms/frontend/mainmenu.page';

test('Add_product_on_homepage_to_cart', { tag: ['@homepage', '@cold'] }, async ({ page }) => {
  const mainmenu = new MainMenuPage(page);

  await page.goto('');

  await mainmenu.mainMenuMiniCartButton.click();

  await expect(page.locator('#minicart-content-wrapper')).toBeVisible();
});
