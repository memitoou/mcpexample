import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { config } from '../config/config';
import { CustomWorld } from '../support/world';

Given('que el usuario está en la página de login', async function (this: CustomWorld) {
  await this.loginPage.open();
  await expect(this.loginPage.loginTitle).toBeVisible();
});

When('ingresa el email {string}', async function (this: CustomWorld, email: string) {
  await this.loginPage.enterEmail(email);
});

When('ingresa la contraseña {string}', async function (this: CustomWorld, password: string) {
  await this.loginPage.enterPassword(password);
});

function getValidUser() {
  const { email, password } = config.validUser;
  if (!email || !password) {
    throw new Error('Faltan LOGIN_EMAIL o LOGIN_PASSWORD en el archivo .env');
  }
  return { email, password };
}

Given('que el usuario inició sesión con el usuario válido', async function (this: CustomWorld) {
  const { email, password } = getValidUser();
  await this.loginPage.open();
  await this.loginPage.login(email, password);
  await expect(this.homePage.loggedInAs).toContainText(config.validUser.name);
});

When('ingresa las credenciales del usuario válido', async function (this: CustomWorld) {
  const { email, password } = getValidUser();
  await this.loginPage.enterEmail(email);
  await this.loginPage.enterPassword(password);
});

When('presiona el botón Login', async function (this: CustomWorld) {
  await this.loginPage.clickLogin();
});

Then('debería ver el mensaje de credenciales incorrectas', async function (this: CustomWorld) {
  await expect(this.loginPage.errorMessage).toBeVisible();
});

Then('debería ver que inició sesión correctamente', async function (this: CustomWorld) {
  await expect(this.homePage.loggedInAs).toContainText(config.validUser.name);
});
