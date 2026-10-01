import 'dotenv/config';

const SUPPORTED_BROWSERS = ['chromium', 'firefox', 'webkit'] as const;
export type BrowserName = (typeof SUPPORTED_BROWSERS)[number];

function resolveBrowser(value = 'chromium'): BrowserName {
  if (!SUPPORTED_BROWSERS.includes(value as BrowserName)) {
    throw new Error(`BROWSER="${value}" no es válido. Usa: ${SUPPORTED_BROWSERS.join(', ')}`);
  }
  return value as BrowserName;
}

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://automationexercise.com',
  browser: resolveBrowser(process.env.BROWSER),
  headless: process.env.HEADLESS !== 'false',
  defaultTimeout: 30_000,
};
