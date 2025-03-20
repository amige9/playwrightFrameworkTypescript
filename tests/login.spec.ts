import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test';
import POManager from '../pageObject/POManager';
import ENV from '../utils/env';
import { createLogger } from '../utils/logger/logger'; import fs from 'fs';
import path from 'path';
const dataset = JSON.parse(JSON.stringify(require('../testData/loginData.json')));

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a logger specifically for this spec file
const logger = createLogger('login');

test('should login successfully', async ({ page }) => {
    // Validate environment variables before using them
    if (!ENV.EMAIL || !ENV.PASSWORD) {
        throw new Error('EMAIL or PASSWORD environment variables are not set');
    }
    logger.info('Starting login test');

    // Initialize Page Object Manager
    const poManager = new POManager(page);

    // Initialize individual Page Objects
    const loginPage = poManager.getLoginPage();

    // Execute test steps
    await loginPage.goTo();
    await loginPage.login(ENV.EMAIL, ENV.PASSWORD)

    // Assert successful login
    await loginPage.verifyLoginIsSuccessful(dataset[0].pageTitle)

    // page teardown
    await page.close();

})

test('Invalid Login Test using Page Object', async ({ page }) => {
    // Validate environment variables before using them
    if (!ENV.EMAIL || !ENV.PASSWORD) {
        throw new Error('EMAIL or PASSWORD environment variables are not set');
    }

    logger.info('Starting invalid credentials test');

    // Initialize Page Object Manager
    const poManager = new POManager(page);

    // Initialize individual Page Objects
    const loginPage = poManager.getLoginPage();

    // Execute test steps
    await loginPage.goTo();
    await loginPage.login(ENV.EMAIL, ENV.PASSWORD)

    // Asset unsuccessful login
    await loginPage.verifyLoginIsSuccessful(dataset[1].pageTitle)

    // page teardown
    await page.close();

})

// test('login test', async({})=>{
//     // browser 1
//     const browser:Browser = await chromium.launch({headless:false})
//     // You use browswerContext when you want to interact with more than one pages
//     // const browserContext:BrowserContext = await browser.newContext();
//     // const page:Page = await browserContext.newPage();
//     const page:Page = await browser.newPage();
//     await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
//     const emailField:Locator = page.locator('#input-email');
//     const pwdField:Locator = page.locator('#input-password');
//     const loginButton:Locator = page.locator("input[value='Login']");

//     await emailField.fill("olams99@gmail.com");
//     await pwdField.fill("bobolets");
//     await loginButton.click();
//     const title = await page.title();
//     console.log("home page title", title);
//     expect(title).toEqual('My Account')

//     // browser 2
//     // const browserContext1:BrowserContext = await browser.newContext();
//     // const page1:Page = await browserContext1.newPage();
//     // await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
//     // const emailField1:Locator = page1.locator('#input-email');
//     // const pwdField1:Locator = page1.locator('#input-password');
//     // const loginButton1:Locator = page1.locator("input[value='Login']");

//     // await emailField1.fill("test1990@gmail.com");
//     // await pwdField1.fill("bobolets");
//     // await loginButton1.click();
//     // const title1 = await page.title();
//     // console.log("home page title", title1);
//     // expect(title1).toEqual('My Account')


//     // await new Promise(()=> {}); // prevents your script from exiting!
// })