// @ts-check

import { test } from '@playwright/test';

import CategoryPage from '@poms/frontend/override/category.page';

test('Filter_category_on_size',{ tag: ['@category', '@cold', '@override']}, async ({page, browserName}) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.goToCategoryPage();
});

test('Sort_category_by_price',{ tag: ['@category', '@cold', '@override']}, async ({page}) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.goToCategoryPage();

    await categoryPage.sortProducts('price');
});

test('Change_amount_of_products_shown',{ tag: ['@category', '@cold', '@override'],}, async ({page}) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.goToCategoryPage();

    await categoryPage.showMoreProducts();
});

