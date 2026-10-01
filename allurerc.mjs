import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Automation Exercise - Pruebas E2E',
  output: './allure-report',
  historyPath: './allure-history/history.jsonl',
  historyLimit: 20,
  plugins: {
    awesome: {
      options: {
        reportLanguage: 'es',
      },
    },
  },
});
