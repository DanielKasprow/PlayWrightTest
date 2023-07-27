import { test, expect, chromium } from '@playwright/test';
import FormPage from '../pages/formPage';
import LoginPage from '../pages/loginPage';
import ReceptionPage from '../pages/receptionPage';
import FinishOrderPage from '../pages/finishOrderPage';

test('arranging a consultation with a prescription', async({page}) =>{
  const startingUrl = 'https://telemedi.com/pl/';
  const loginUrl = 'https://panel.telemedi.com/pl/login';
  const mainUrl = 'https://panel.telemedi.com/pl';
  const makeConsultationUrl = 'https://panel.telemedi.com/pl/make-consultation?utm_source=menu_order_perscription';
  const finalUrl = 'https://secure.payu.com/';
  const userName = 'telemeditest@gmail.com';
  const password = 'Telemeditest12!';
  const drugName = 'Afastural';
  const drugVariant = '1 sasz. 8 g';

  const formPage = await new FormPage(page);
  await formPage.navigae(startingUrl);
  await formPage.acceptTerm();
  await formPage.clickButtonLogin();
  expect(page.url().startsWith(loginUrl)).toBeTruthy();

  const loginPage = await new LoginPage(page);
  await loginPage.enterUserName(userName);
  await loginPage.enterPassword(password);
  await loginPage.clickButtonLogin();
  expect(page.url().startsWith(mainUrl)).toBeTruthy();

  const receptionPage = await new ReceptionPage(page);
  await receptionPage.clickVisit();
  await receptionPage.clickOrder();
  expect(page.url().startsWith(makeConsultationUrl)).toBeTruthy();
  await receptionPage.enterDrug(drugName);
  await receptionPage.selectDrugVariant(drugVariant);

  const finishOrderPage = await new FinishOrderPage(page);
  await finishOrderPage.finishOrder(false);
  await page.waitForFunction(() => document.title === 'PayU');
  expect(page.url().startsWith(finalUrl)).toBeTruthy();

});