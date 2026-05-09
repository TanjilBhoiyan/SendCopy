import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { SettingsPage } from '../../pages/SettingsPages/SettingsPage';


test.describe.configure({mode:'serial'});

test.describe('Settings page test',()=>{
    /** @type {SettingsPage} */
    let settings;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        settings = new SettingsPage(page);
        await settings.settingsButton();

        
    })
    // test('',async ({})=>{

    // })
    // test('',async ({})=>{

    // })
    // test('',async ({})=>{

    // })
    // test('Should open linkedin sendcopy profile in a new tab after click on community',async ({page,context})=>{
    //     const context = await browser.newContext;

    //     const settingsPage = await context.newPage();

    // })
    test.only('Check skip for now button is working when Watching guidline',async ({})=>{
        await settings.WatchGuidline();
        //await expect(getByText('all set! Enjoy SendCopy.')).toBeVisible();
    })
    test('Check Login page appear after click on log out button',async ({page})=>{
        await settings.LogOutButton();
    })
})

// npx playwright test tests/SettingsTests/SettingsTest.spec.js --project chromium --debug
