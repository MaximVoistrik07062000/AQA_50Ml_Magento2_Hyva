// @ts-check

import { test, expect } from '@playwright/test';
import { UIReference, outcomeMarker, inputValues, slugs } from '@config';

import SearchPage from '@poms/frontend/override/search.page';

test.describe('Search functionality', () => {
  test('Search_query_returns_multiple_results',  { tag: ['@override'] }, async ({ page }) => {
    await page.goto('');
    const searchPage = new SearchPage(page);
    await searchPage.search(inputValues.search.queryMultipleResults);
    await expect(page).toHaveURL(/catalogsearch\/result/);
    const results = page.locator('.ds-sdk-product-item');
    const resultCount = await results.count();
    expect(resultCount).toBeGreaterThan(1);
  });

  test('User_can_find_a_specific_product_and_navigate_to_its_page', { tag: ['@override'] }, async ({ page }) => {
    await page.goto('');
    const searchPage = new SearchPage(page);
    await searchPage.search(inputValues.search.querySpecificProduct);
    const productLink = page.locator('.ds-sdk-product-item__product-name')
        .filter({ hasText: inputValues.search.querySpecificProduct })
        .first();

    await expect(productLink, 'Product should be found in search results').toBeVisible();
    await productLink.click()
    await expect(page).toHaveURL(/darling-la-dolce-vita-face-body-suncare-kit/);
  });

  test('No_results_message_is_shown_for_unknown_query', { tag: ['@override'] }, async ({ page }) => {
    await page.goto('');
    const searchPage = new SearchPage(page);
    await searchPage.search(inputValues.search.queryNoResults);
    await expect(page.getByText(outcomeMarker.search.noResultsMessage)).toBeVisible();
  });
});
