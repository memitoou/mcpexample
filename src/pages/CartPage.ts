import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly rows: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  async open(): Promise<void> {
    await this.navigate('/view_cart');
  }

  rowFor(productName: string): Locator {
    return this.rows.filter({
      has: this.page.locator('.cart_description h4 a', { hasText: productName }),
    });
  }

  quantityOf(productName: string): Locator {
    return this.rowFor(productName).locator('.cart_quantity button');
  }

  async removeProduct(productName: string): Promise<void> {
    const row = this.rowFor(productName);
    await this.click(row.locator('.cart_quantity_delete'));
    await row.waitFor({ state: 'detached' });
  }
}
