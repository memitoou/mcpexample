import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
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

Given('que el usuario inició sesión con un usuario registrado', async function (this: CustomWorld) {
  const { email, password, name } = this.requireUser();
  await this.loginPage.open();
  await this.loginPage.login(email, password);
  await expect(this.homePage.loggedInAs).toContainText(name);
});

When('ingresa las credenciales del usuario registrado', async function (this: CustomWorld) {
  const { email, password } = this.requireUser();
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
  await expect(this.homePage.loggedInAs).toContainText(this.requireUser().name);
});
