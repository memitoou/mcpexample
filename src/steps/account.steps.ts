import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { UserFactory } from '../data/UserFactory';
import { CustomWorld } from '../support/world';

Given('que existe un usuario registrado', async function (this: CustomWorld) {
  const user = UserFactory.create();
  await this.accountApi.createAccount(user);
  this.currentUser = user;
});

When('inicia el registro con un usuario nuevo', async function (this: CustomWorld) {
  this.currentUser = UserFactory.create();
  await this.loginPage.startSignup(this.currentUser.name, this.currentUser.email);
  await expect(this.signupPage.accountInfoTitle).toBeVisible();
});

When('inicia el registro con el email del usuario registrado', async function (this: CustomWorld) {
  const { name, email } = this.requireUser();
  await this.loginPage.startSignup(name, email);
});

When('completa la información de la cuenta', async function (this: CustomWorld) {
  await this.signupPage.fillAccountInformation(this.requireUser());
});

When('presiona el botón Create Account', async function (this: CustomWorld) {
  await this.signupPage.createAccount();
});

Then('debería ver que la cuenta fue creada', async function (this: CustomWorld) {
  await expect(this.accountStatusPage.accountCreatedTitle).toHaveText(/Account Created!/i);
});

When('presiona Continue', async function (this: CustomWorld) {
  await this.accountStatusPage.continue();
});

When('elimina su cuenta', async function (this: CustomWorld) {
  await this.homePage.deleteAccount();
});

Then('debería ver que la cuenta fue eliminada', async function (this: CustomWorld) {
  await expect(this.accountStatusPage.accountDeletedTitle).toHaveText(/Account Deleted!/i);
  this.userDeleted = true;
});

Then('debería ver el mensaje de email ya registrado', async function (this: CustomWorld) {
  await expect(this.loginPage.emailExistsMessage).toBeVisible();
});
