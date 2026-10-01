import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  homePage!: HomePage;
  productsPage!: ProductsPage;
  cartPage!: CartPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(): void {
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
  }
}

setWorldConstructor(CustomWorld);
