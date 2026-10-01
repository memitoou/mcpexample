import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly sectionTitle: Locator;
  readonly productCards: Locator;
  readonly addedModal: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionTitle = page.locator('.features_items .title');
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.addedModal = page.locator('#cartModal');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.continueShoppingButton = this.addedModal.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = this.addedModal.locator('a[href="/view_cart"]');
  }

  async open(): Promise<void> {
    await this.navigate('/products');
  }

  async search(term: string): Promise<void> {
    await this.fill(this.searchInput, term);
    await this.click(this.searchButton);
  }

  async getProductNames(): Promise<string[]> {
    return this.productCards.locator('.productinfo p').allInnerTexts();
  }

  async addToCart(productName: string): Promise<void> {
    const card = this.productCards.filter({
      has: this.page.locator('.productinfo p', { hasText: new RegExp(`^${escapeRegExp(productName)}$`) }),
    });
    await this.click(card.locator('.productinfo .add-to-cart'));
    await this.addedModal.waitFor({ state: 'visible' });
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
    await this.addedModal.waitFor({ state: 'hidden' });
  }

  async goToCartFromModal(): Promise<void> {
    await this.click(this.viewCartLink);
    await this.page.waitForURL('**/view_cart');
  }
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
