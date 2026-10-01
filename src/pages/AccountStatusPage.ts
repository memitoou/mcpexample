import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Pantallas de confirmación "Account Created!" y "Account Deleted!"
export class AccountStatusPage extends BasePage {
  readonly accountCreatedTitle: Locator;
  readonly accountDeletedTitle: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedTitle = page.locator('[data-qa="account-created"]');
    this.accountDeletedTitle = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async continue(): Promise<void> {
    await this.click(this.continueButton);
  }
}
