import { test, expect, chromium } from '@playwright/test';
import FormPage from '../pages/formPage';
import LoginPage from '../pages/loginPage';
import ReceptionPage from '../pages/receptionPage';
import FinishOrderPage from '../pages/finishOrderPage';

test('umawianie konsultacji', async({page}) =>{
  test.setTimeout(60000);

  //const browser = await chromium.launch({
  //  headless: false
  //})
  //const context = await browser.newContext();
  //const page = await context.newPage();

  const formPage = await new FormPage(page);
  await formPage.navigae('https://telemedi.com/pl/');
  await formPage.acceptTerm();
  await formPage.clickButtonLogin();
  expect(page.url().startsWith('https://panel.telemedi.com/pl/login')).toBeTruthy();

  const loginPage = await new LoginPage(page);
  await loginPage.enterUserName('telemeditest@gmail.com');
  await loginPage.enterPassword('Telemeditest12!');
  await loginPage.clickButtonLogin();
  expect(page.url().startsWith('https://panel.telemedi.com/pl')).toBeTruthy();

  const receptionPage = await new ReceptionPage(page);
  await receptionPage.clickVisit();
  await receptionPage.clickOrder();
  await receptionPage.enterdrug('Afastural');
  await receptionPage.selectDrugVariant();

  const finishOrderPage = await new FinishOrderPage(page);
  await finishOrderPage.finishOrder(false);

  //await page.waitForSelector('//button[@class="buttons-wrapper"]/button[2]');
  //await page.locator('div > div > div > form > div > div.footer-bar > div > button:nth-child(2)').click();

  //await browser.close()


});

test('umawianie konsultacji stare', async({page}) =>{

  await page.goto('https://telemedi.com/pl/');

  await page.click('button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]');

  await page.click('//a[@class="theme-light btn btn--secondary btn--medium"]');

  await page.fill('input[id="username"]', 'telemeditest@gmail.com');

  await page.fill('input[id="password"]', 'Telemeditest12!');

  await page.click('button[type="submit"]');

  

  const button = '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-fullWidth"]';

  await page.waitForSelector(button);

  await page.click(button);

  await page.click('//button[@id="consultationNestedMenu:prescriptionHeader"]');


  await page.waitForSelector('div[class="select-v2 css-2b097c-container"] >div');
  
  const filter = await page.locator('div[class="select-v2 css-2b097c-container"] >div');

  expect(await filter.isVisible()).toBeTruthy();


  await filter.click();

  const search = await page.locator('#react-select-2-input');

  search.fill('Afastural');

  await page.waitForTimeout(3000);

  await search.press('Enter');








  await page.waitForSelector('div[class="fk-select fk-select--no-small-placeholder fk-select--font-lighter"]');
  
  const select = await page.locator('div[class="fk-select fk-select--no-small-placeholder fk-select--font-lighter"]');

  await select.click();
  await page.click('div[class="fk-select fk-select--no-small-placeholder fk-select--font-lighter"] >div >div >:nth-of-type(2)>div>div>:nth-of-type(2)');


  await page.check('label[class="fk-checkbox__label"]');

  await page.click('button[class="fk-button"]');

  await page.waitForSelector('div[class="fk-input-wrapper telemedi-go"] >div >label');









  await page.click('div[class="fk-input-wrapper telemedi-go"] >div >label');
  
  await page.check('div[class="fk-checkbox fk-input fk-check-all"]>label');

  await page.waitForSelector('div > div > div > form > div > div.footer-bar > div > button:nth-child(2)');
  const finish = await page.locator('div > div > div > form > div > div.footer-bar > div > button:nth-child(2)');


});
