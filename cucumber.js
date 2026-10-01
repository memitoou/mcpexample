module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      // Cucumber solo permite un formatter en stdout, por eso Allure escribe a un archivo
      'allure-cucumberjs/reporter:reports/allure-formatter.log',
    ],
    formatOptions: {
      resultsDir: 'allure-results',
      environmentInfo: {
        Navegador: process.env.BROWSER ?? 'chromium',
        URL: process.env.BASE_URL ?? 'https://automationexercise.com',
        SO: process.platform,
        Node: process.version,
      },
    },
  },
};
