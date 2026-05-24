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
    test.only('claim update plan',async ({})=>{
        await settings.billingButton();
        await settings.updatePlan();
    })
    test('Should open linkedin sendcopy profile in a new tab after click on community',async ({page,context})=>{
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        settings.communityButton()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.linkedin.com/company/sendcopy-ai');

    })
    test('Check skip for now button is working when Watching guidline',async ({})=>{
        await settings.WatchGuidline();
        //await expect(getByText('all set! Enjoy SendCopy.')).toBeVisible();
    })
    test('Check Login page appear after click on log out button',async ({page})=>{
        await settings.LogOutButton();
    })
})

// npx playwright test tests/SettingsTests/SettingsTest.spec.js --project chromium --debug
