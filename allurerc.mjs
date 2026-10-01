import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Automation Exercise - Pruebas E2E',
  output: './allure-report',
  plugins: {
    awesome: {
      options: {
        reportLanguage: 'es',
      },
    },
  },
});
