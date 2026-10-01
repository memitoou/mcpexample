import 'dotenv/config';

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://automationexercise.com',
  headless: process.env.HEADLESS !== 'false',
  defaultTimeout: 30_000,
};
