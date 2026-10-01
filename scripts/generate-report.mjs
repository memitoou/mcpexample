import { generate } from 'multiple-cucumber-html-reporter';
import os from 'os';

// Nombres que entiende el reporter para mostrar el ícono del navegador
const reporterBrowser = { chromium: 'chrome', firefox: 'firefox', webkit: 'safari' };

generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  pageTitle: 'Automation Exercise - Reporte',
  reportName: 'Reporte de pruebas - Automation Exercise',
  displayDuration: true,
  metadata: {
    browser: { name: reporterBrowser[process.env.BROWSER ?? 'chromium'] ?? 'chrome', version: 'latest' },
    device: os.hostname(),
    platform: { name: process.platform === 'win32' ? 'windows' : process.platform, version: os.release() },
  },
  customData: {
    title: 'Información de ejecución',
    data: [
      { label: 'Proyecto', value: 'Playwright + Cucumber + POM' },
      { label: 'URL', value: process.env.BASE_URL ?? 'https://automationexercise.com' },
      { label: 'Fecha', value: new Date().toLocaleString('es') },
    ],
  },
});
