import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinAccountPage } from '../../pages/LinkedInAccountsPages/LinkedinAccountPage';


test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type {LinkedinAccountPage} */
    let linkedinAccount;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('tanjil.bhoiyan@seedlink.vc','Tanjil123@#?');
        linkedinAccount = new LinkedinAccountPage(page);
        await linkedinAccount.linkedinAccountButton();

        // create object for generate leads page
    })
    // test.only('',async ({page})=>{
        

    // })
    test.only('After click on previous button check page will go to previous page ',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.previousButton();
        await expect(page.getByText('Connect LinkedIn Account with Cookies')).toBeVisible();
    })
    test('Try to connect linkedin account using cookies connect without select country',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.liatValueInput('AQEFAa0BAAAAABngAyYAAAGanOZMMkVCQ3RLaW9yQ2FLbFpXWk1ZUVF4S2tveWVNQ00yQk1yeXBhdHg1U1JBdGJmS3doUkhFcUtqeUZBUXpZcS9ZcURBd0FnQzF0Z2Y2XnVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjM0Mjk1MTc2NCw2MjIxNDA2OTcpXnVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjM0Mzk3NjM4MCw2MjY5NzAzOTMpXnVybjpsaTptZW1iZXI6MTA2OTY4OTE0MLWCKi7W0TEX7HwofEBZaV0_Kr0KHZmgXpGNy9zKYpDYRPj4spGoxoglr15VmKV15PvbrtPJMGzM_gCwIY_hG8JojoHKC7IBzze9pwSfREQL5Yn')
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin account using cookies connect without select conversation',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.liatValueInput('AQEFAa0BAAAAABngAyYAAAGanOZMMkVCQ3RLaW9yQ2FLbFpXWk1ZUVF4S2tveWVNQ00yQk1yeXBhdHg1U1JBdGJmS3doUkhFcUtqeUZBUXpZcS9ZcURBd0FnQzF0Z2Y2XnVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjM0Mjk1MTc2NCw2MjIxNDA2OTcpXnVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjM0Mzk3NjM4MCw2MjY5NzAzOTMpXnVybjpsaTptZW1iZXI6MTA2OTY4OTE0MLWCKi7W0TEX7HwofEBZaV0_Kr0KHZmgXpGNy9zKYpDYRPj4spGoxoglr15VmKV15PvbrtPJMGzM_gCwIY_hG8JojoHKC7IBzze9pwSfREQL5Yn')
        await linkedinAccount.selectCountry('BD - Bangladesh');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin account using cookies connect without LIAT value',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('BD - Bangladesh');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin account using cookies connect and using invalid cookies LIAT value',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.liatValueInput('AQEFAa0BAAAAABngAyYAAAGanOZMMkVCQ3RLaW9yQ2FLbFpXWk1ZUVF4S2tveWVNQ00yQk1yeXBhdHg1U1JBdGJmS3doUkhFcUtqeUZBUXpZcS9ZcURBd0FnQzF0Z2Y2XnVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjM0Mjk1MTc2NCw2MjIxNDA2OTcpXnVybjpsaTplbnRlcnByaXNlUHJvZmlsZToodXJuOmxpOmVudGVycHJpc2VBY2NvdW50OjM0Mzk3NjM4MCw2MjY5NzAzOTMpXnVybjpsaTptZW1iZXI6MTA2OTY4OTE0MLWCKi7W0TEX7HwofEBZaV0_Kr0KHZmgXpGNy9zKYpDYRPj4spGoxoglr15VmKV15PvbrtPJMGzM_gCwIY_hG8JojoHKC7IBzze9pwSfREQL5Yn')
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('BD - Bangladesh');
        await linkedinAccount.connectAccount().click();
        await expect(page.getByText('invalid credential')).toBeVisible();
    })
    test('Verify afte click on connect using cookies,Should appear Cookies connection instruction',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await expect(page.getByText('Connect LinkedIn Account with Cookies')).toBeVisible();
    })

// connect with credential
    test('Try to connect using valid email and password',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('xyzbhoiyan@gmail.com');
        await linkedinAccount.linkedinPasswordInput('Tanjil123');
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('AR - Argentina');
        await linkedinAccount.connectAccount().click();
        await expect(page.getByText('Login Successfull')).toBeVisible();
    })
    test('Try to connect using wrong linkedin email',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('xyzbhoiyan@gmail.com');
        await linkedinAccount.linkedinPasswordInput('Tanjil123');
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('AR - Argentina');
        await linkedinAccount.connectAccount().click();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    })
    test('Try to connect linkedin without select your country',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('tanjilbhoiyan@gmail.com');
        await linkedinAccount.linkedinPasswordInput('Tanjil123');
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        //await linkedinAccount.selectCountry('AR - Argentina');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin without selecting conversation to load into',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('tanjilbhoiyan@gmail.com');
        await linkedinAccount.linkedinPasswordInput('Tanjil123');
        //await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('AR - Argentina');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin using less than 6 character password',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('tanjilbhoiyan@gmail.com');
        await linkedinAccount.linkedinPasswordInput('Tanji');
        await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    })
    test('Try to connect linkedin without password',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('tanjilbhoiyan@gmail.com');
        await linkedinAccount.linkedinPasswordInput('');
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('AR - Argentina');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin invalid email address',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('tanjilbhoiyan.com');
        await linkedinAccount.linkedinPasswordInput('Tanjil123@#?');
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('AR - Argentina');
        await expect(page.getByText('Invalid email address')).toBeVisible();
    })
    test('Try to connect linkedin without email address',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('');
        await linkedinAccount.linkedinPasswordInput('Tanjil123@#?');
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry('AR - Argentina');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Check the connect account modal opens properly',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await expect(linkedinAccount.connectAccountModal()).toBeVisible();
    })
    test('Check after click on purchase seats button go to Billing page',async ({page})=>{
        await linkedinAccount.purchaseSeatsButton().click();
        await expect(page).toHaveURL('https://app.sendcopy.ai/settings/billing');
    })
})

// npx playwright test tests/LinkedinAccountsTests/LinkedinAccountsTest.spec.js --project chromium --debug
