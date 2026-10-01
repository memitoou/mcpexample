import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('que el usuario está en la página de productos', async function (this: CustomWorld) {
  await this.productsPage.open();
  await expect(this.productsPage.sectionTitle).toHaveText(/All Products/i);
});

When('busca el producto {string}', async function (this: CustomWorld, term: string) {
  await this.productsPage.search(term);
});

Then('debería ver el título {string}', async function (this: CustomWorld, title: string) {
  await expect(this.productsPage.sectionTitle).toHaveText(new RegExp(title, 'i'));
});

Then('debería ver al menos {int} producto(s)', async function (this: CustomWorld, min: number) {
  await expect(this.productsPage.productCards.first()).toBeVisible();
  expect(await this.productsPage.productCards.count()).toBeGreaterThanOrEqual(min);
});

Then('todos los resultados deberían contener {string}', async function (this: CustomWorld, term: string) {
  const names = await this.productsPage.getProductNames();
  expect(names.length).toBeGreaterThan(0);
  for (const name of names) {
    expect(name.toLowerCase()).toContain(term.toLowerCase());
  }
});
