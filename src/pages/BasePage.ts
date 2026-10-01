import { Locator, Page } from '@playwright/test';
import { config } from '../config/config';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async navigate(path: string): Promise<void> {
    await this.page.goto(`${config.baseUrl}${path}`);
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
