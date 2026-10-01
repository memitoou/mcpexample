import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { AccountApi } from '../api/AccountApi';
import { NewUser } from '../data/UserFactory';
import { AccountStatusPage } from '../pages/AccountStatusPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { SignupPage } from '../pages/SignupPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  homePage!: HomePage;
  productsPage!: ProductsPage;
  cartPage!: CartPage;
  signupPage!: SignupPage;
  accountStatusPage!: AccountStatusPage;
  accountApi!: AccountApi;
  // Usuario creado en el escenario; el hook After lo elimina si sigue existiendo
  currentUser?: NewUser;
  userDeleted = false;

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(): void {
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.signupPage = new SignupPage(this.page);
    this.accountStatusPage = new AccountStatusPage(this.page);
    this.accountApi = new AccountApi(this.context.request);
  }

  requireUser(): NewUser {
    if (!this.currentUser) {
      throw new Error('El escenario no tiene un usuario. Usa primero un paso que lo cree.');
    }
    return this.currentUser;
  }
}

setWorldConstructor(CustomWorld);
