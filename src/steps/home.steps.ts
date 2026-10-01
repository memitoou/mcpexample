import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('presiona el enlace Logout', async function (this: CustomWorld) {
  await this.homePage.logout();
});

Then('debería ser redirigido a la página de login', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/login$/);
  await expect(this.loginPage.loginTitle).toBeVisible();
});

Then('ya no debería ver la sesión iniciada', async function (this: CustomWorld) {
  await expect(this.homePage.loggedInAs).toBeHidden();
  await expect(this.homePage.signupLoginLink).toBeVisible();
});
