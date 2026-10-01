import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly loginTitle: Locator;
  readonly errorMessage: Locator;
  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;
  readonly emailExistsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginTitle = page.getByRole('heading', { name: 'Login to your account' });
    this.errorMessage = page.getByText('Your email or password is incorrect!');
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.emailExistsMessage = page.getByText('Email Address already exist!');
  }

  async open(): Promise<void> {
    await this.navigate('/login');
  }

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
    await this.click(this.signupButton);
  }
}
