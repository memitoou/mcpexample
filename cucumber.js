module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    format: ['progress-bar', 'html:reports/cucumber-report.html', 'json:reports/cucumber-report.json'],
  },
};
