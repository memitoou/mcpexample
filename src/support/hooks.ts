import { After, Before, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import path from 'path';
import { config } from '../config/config';
import { CustomWorld } from './world';

setDefaultTimeout(config.defaultTimeout);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: config.headless });
  this.context = await this.browser.newContext();
  // Los anuncios de Google pueden tapar elementos o redirigir la página
  await this.context.route(/googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoices/, (route) =>
    route.abort(),
  );
  await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  this.page = await this.context.newPage();
  this.initPages();
});

After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');

    const safeName = pickle.name.replace(/[^a-z0-9]+/gi, '_');
    const tracePath = path.join('test-results', 'traces', `${safeName}_${Date.now()}.zip`);
    await this.context.tracing.stop({ path: tracePath });
    this.attach(`Trace: npx playwright show-trace ${tracePath}`, 'text/plain');
  } else {
    await this.context?.tracing.stop();
  }

  if (this.currentUser && !this.userDeleted) {
    const { email, password } = this.currentUser;
    await this.accountApi
      .deleteAccount(email, password)
      .catch((error: Error) => this.attach(`No se pudo limpiar ${email}: ${error.message}`, 'text/plain'));
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
