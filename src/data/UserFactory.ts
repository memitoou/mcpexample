import { randomBytes } from 'crypto';

export interface NewUser {
  title: 'Mr' | 'Mrs';
  name: string;
  email: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class UserFactory {
  static create(overrides: Partial<NewUser> = {}): NewUser {
    const id = `${Date.now()}${randomBytes(3).toString('hex')}`;
    return {
      title: 'Mr',
      name: `QA ${id.slice(-6)}`,
      email: `qa.${id}@example.com`,
      password: `Pw!${randomBytes(9).toString('base64url')}`,
      birthDay: '10',
      birthMonth: '5',
      birthYear: '1995',
      firstName: 'QA',
      lastName: 'Automation',
      company: 'Test Co',
      address1: 'Street 1',
      address2: 'Apt 2',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: '12345',
      mobileNumber: '5551234567',
      ...overrides,
    };
  }
}
