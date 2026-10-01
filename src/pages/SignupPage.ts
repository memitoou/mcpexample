import { Locator, Page } from '@playwright/test';
import { NewUser } from '../data/UserFactory';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  readonly accountInfoTitle: Locator;
  private readonly password: Locator;
  private readonly days: Locator;
  private readonly months: Locator;
  private readonly years: Locator;
  private readonly newsletter: Locator;
  private readonly optin: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly company: Locator;
  private readonly address1: Locator;
  private readonly address2: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobileNumber: Locator;
  private readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountInfoTitle = page.getByRole('heading', { name: 'Enter Account Information' });
    this.password = page.locator('[data-qa="password"]');
    this.days = page.locator('[data-qa="days"]');
    this.months = page.locator('[data-qa="months"]');
    this.years = page.locator('[data-qa="years"]');
    this.newsletter = page.locator('#newsletter');
    this.optin = page.locator('#optin');
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.company = page.locator('[data-qa="company"]');
    this.address1 = page.locator('[data-qa="address"]');
    this.address2 = page.locator('[data-qa="address2"]');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipcode = page.locator('[data-qa="zipcode"]');
    this.mobileNumber = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  private titleRadio(title: NewUser['title']): Locator {
    return this.page.locator(title === 'Mr' ? '#id_gender1' : '#id_gender2');
  }

  async fillAccountInformation(user: NewUser): Promise<void> {
    await this.titleRadio(user.title).check();
    await this.fill(this.password, user.password);
    await this.days.selectOption(user.birthDay);
    await this.months.selectOption(user.birthMonth);
    await this.years.selectOption(user.birthYear);
    await this.newsletter.check();
    await this.optin.check();
    await this.fill(this.firstName, user.firstName);
    await this.fill(this.lastName, user.lastName);
    await this.fill(this.company, user.company);
    await this.fill(this.address1, user.address1);
    await this.fill(this.address2, user.address2);
    await this.country.selectOption(user.country);
    await this.fill(this.state, user.state);
    await this.fill(this.city, user.city);
    await this.fill(this.zipcode, user.zipcode);
    await this.fill(this.mobileNumber, user.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.click(this.createAccountButton);
  }
}
