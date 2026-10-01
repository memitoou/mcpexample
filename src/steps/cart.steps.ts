import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('agrega el producto {string} al carrito', async function (this: CustomWorld, product: string) {
  await this.productsPage.addToCart(product);
});

When('agrega los siguientes productos al carrito:', async function (this: CustomWorld, table: DataTable) {
  for (const [product] of table.raw()) {
    await this.productsPage.addToCart(product);
    await this.productsPage.continueShopping();
  }
});

When('va al carrito desde el modal', async function (this: CustomWorld) {
  await this.productsPage.goToCartFromModal();
});

When('abre el carrito', async function (this: CustomWorld) {
  await this.cartPage.open();
});

When('elimina el producto {string} del carrito', async function (this: CustomWorld, product: string) {
  await this.cartPage.removeProduct(product);
});

Then(
  'el carrito debería contener {string} con cantidad {int}',
  async function (this: CustomWorld, product: string, quantity: number) {
    await expect(this.cartPage.rowFor(product)).toBeVisible();
    await expect(this.cartPage.quantityOf(product)).toHaveText(String(quantity));
  },
);

Then('el carrito debería tener {int} producto(s)', async function (this: CustomWorld, count: number) {
  await expect(this.cartPage.rows).toHaveCount(count);
});

Then('debería ver el mensaje de carrito vacío', async function (this: CustomWorld) {
  await expect(this.cartPage.emptyCartMessage).toBeVisible();
});
