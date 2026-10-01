import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly loggedInAs: Locator;
  private readonly logoutLink: Locator;
  readonly signupLoginLink: Locator;
  private readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.loggedInAs = page.locator('#header').getByText(/Logged in as/);
    this.logoutLink = page.locator('#header a[href="/logout"]');
    this.signupLoginLink = page.locator('#header a[href="/login"]');
    this.deleteAccountLink = page.locator('#header a[href="/delete_account"]');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async logout(): Promise<void> {
    await this.click(this.logoutLink);
  }

  async deleteAccount(): Promise<void> {
    await this.click(this.deleteAccountLink);
  }
}
