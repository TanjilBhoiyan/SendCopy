import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { SettingsPage } from '../../pages/SettingsPages/SettingsPage';
import testData from '../../testData/testData.json';

test.describe.configure({mode:'default'});

test.describe('Settings page test',()=>{
    /** @type {SettingsPage} */
    let settings;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.signupData.newValidEmail,testData.signupData.newPassword);
        settings = new SettingsPage(page);
        await settings.settingsButton();

        
    })
    // test.only('Check skip for now button is working when Watching guidline',async ({})=>{
    //     await settings.WatchGuidline();
    //     //await expect(getByText('all set! Enjoy SendCopy.')).toBeVisible();
    // })
    // test('',async({})=>{

    // })

    test.skip('Check the View invoice is working',async ({})=>{
        await settings.billingButton();
        await settings.invoice();
        await settings.threeDotButton();
        await settings.viewButton();
    })

    test('choose a starter growth plan',async ({page})=>{
        await settings.billingButton();
        await settings.choosePlanGrowth();
        await settings.ContinueButton();
        await settings.paymentMethod();
        //await settings.waitForLoadState('networkidle');
        await expect(page.getByText("You're all set!")).toBeVisible({ timeout: 15000 });
    })
    test('claim update plan',async ({})=>{
        await settings.billingButton();
        await settings.updatePlan();
        await settings.ContinueButton();
    })
    test('Should open linkedin sendcopy profile in a new tab after click on community',async ({page,context})=>{
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        settings.communityButton()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.linkedin.com/company/sendcopy-ai');

    })

    test('Check Login page appear after click on log out button',async ({page})=>{
        await settings.LogOutButton();
    })
    test.skip('Check the Download invoice button is working',async ({})=>{
        await settings.billingButton();
        await settings.invoice();
        await settings.threeDotButton();
        await settings.downloadButton();
    })
})

// npx playwright test tests/02_SettingsTests/SettingsTest.spec.js --project chromium --debug
