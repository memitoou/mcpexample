import { APIRequestContext } from '@playwright/test';
import { config } from '../config/config';
import { NewUser } from '../data/UserFactory';

interface ApiResponse {
  responseCode: number;
  message: string;
}

export class AccountApi {
  constructor(private readonly request: APIRequestContext) {}

  async createAccount(user: NewUser): Promise<void> {
    const response = await this.request.post(`${config.baseUrl}/api/createAccount`, {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title,
        birth_date: user.birthDay,
        birth_month: user.birthMonth,
        birth_year: user.birthYear,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address1,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobileNumber,
      },
    });
    await this.assertResponse(response.json(), 201, 'crear la cuenta');
  }

  async deleteAccount(email: string, password: string): Promise<void> {
    const response = await this.request.delete(`${config.baseUrl}/api/deleteAccount`, {
      form: { email, password },
    });
    await this.assertResponse(response.json(), 200, 'eliminar la cuenta');
  }

  // La API siempre responde HTTP 200; el resultado real viene en responseCode
  private async assertResponse(body: Promise<ApiResponse>, expected: number, action: string): Promise<void> {
    const { responseCode, message } = await body;
    if (responseCode !== expected) {
      throw new Error(`No se pudo ${action}: ${responseCode} ${message}`);
    }
  }
}
