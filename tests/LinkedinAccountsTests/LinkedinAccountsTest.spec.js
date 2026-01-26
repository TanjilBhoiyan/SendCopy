import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinAccountPage } from '../../pages/LinkedInAccountsPages/LinkedinAccountPage';
import testData from '../../testData/testData.json';


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
    test('If select a proxy required country should appear verify your proxy option',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.country);
        await expect(linkedinAccount.verifyYourProxyDiv()).toHaveCount(1);
    })
    test('After click on previous button check page will go to previous page ',async ({page})=>{
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
        await linkedinAccount.liatValueInput(testData.linkedinAccountSPages.invalid_LIAT_token);
        await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin account using cookies connect without select conversation',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.liatValueInput(testData.linkedinAccountSPages.invalid_LIAT_token)
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.country);
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin account using cookies connect without LIAT value',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.country);
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin account using cookies connect and using invalid cookies LIAT value',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.connectCookiesButton();
        await linkedinAccount.nextStepButton();
        await linkedinAccount.liatValueInput(testData.linkedinAccountSPages.invalid_LIAT_token);
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.country);
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
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.wrong_linkedin_email);
        await linkedinAccount.linkedinPasswordInput('Tanjil123');
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
        await linkedinAccount.connectAccount().click();
        await expect(page.getByText('Login Successfull')).toBeVisible();
    })
    test('Try to connect using wrong linkedin email',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.wrong_linkedin_email);
        await linkedinAccount.linkedinPasswordInput(testData.linkedinAccountSPages.valid_linkedin_email);
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
        await linkedinAccount.connectAccount().click();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    })
    test('Try to connect linkedin without select your country',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.valid_linkedin_email);
        await linkedinAccount.linkedinPasswordInput(testData.linkedinAccountSPages.valid_linkedin_email);
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        //await linkedinAccount.selectCountry('AR - Argentina');
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin without selecting conversation to load into',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.valid_linkedin_email);
        await linkedinAccount.linkedinPasswordInput(testData.linkedinAccountSPages.valid_linkedin_email);
        //await linkedinAccount.inboxPrivacyConfiguration('Track and import all LinkedIn conversations');
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin using less than 6 character password',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.valid_linkedin_email);
        await linkedinAccount.linkedinPasswordInput('Tanji');
        await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    })
    test('Try to connect linkedin without password',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.valid_linkedin_email);
        await linkedinAccount.linkedinPasswordInput('');
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
        await expect(linkedinAccount.connectAccount()).toBeDisabled();
    })
    test('Try to connect linkedin invalid email address',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.invalid_email);
        await linkedinAccount.linkedinPasswordInput(testData.linkedinAccountSPages.linkedin_account_password);
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
        await expect(page.getByText('Invalid email address')).toBeVisible();
    })
    test('Try to connect linkedin without email address',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await linkedinAccount.linkedinEmailAddressInput('');
        await linkedinAccount.linkedinPasswordInput(testData.linkedinAccountSPages.linkedin_account_password);
        await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
        await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
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
    test('Try to set max follows/Day grater than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxFollowDay('41');
        await expect(page.getByText('Value must be at most 40')).toBeVisible();
        //await linkedinAccount.updateSettingsButton().click();
    });
    test.only('Try to set max follows/Day less than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxFollowDay('39');
        await linkedinAccount.updateSettingsButton().click();
        await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    });
    test('Try to set max message/Day grater than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxMessageDay('41');
        await expect(page.getByText('Value must be at most 40')).toBeVisible();
        //await linkedinAccount.updateSettingsButton().click();
    });
    test('Try to set max message/Day less than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxMessageDay('39');
        await linkedinAccount.updateSettingsButton().click();
        await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    });

    test('Try to set max InMail/Day grater than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.inMailMessageDay('41');
        await expect(page.getByText('Value must be at most 40')).toBeVisible();
        //await linkedinAccount.updateSettingsButton().click();
    });
    test.only('Try to set max InMail/Day less than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.inMailMessageDay('39');
        await linkedinAccount.updateSettingsButton().click();
        await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    });
    test('Try to set max Connection Request/Day grater than 25', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxConnectionRequestDay('26');
        await expect(page.getByText('Value must be at most 40')).toBeVisible();
        //await linkedinAccount.updateSettingsButton().click();
    });
    test.only('Try to set max Connection Request/Day less than 25', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxConnectionRequestDay('24');
        await linkedinAccount.updateSettingsButton().click();
        await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    });
    test('Try to set max Profile Views/Day grater than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxProfileViewsDay('41');
        await expect(page.getByText('Value must be at most 40')).toBeVisible();
        //await linkedinAccount.updateSettingsButton().click();
    });
    test.only('Try to set max Profile Views/Day less than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxProfileViewsDay('39');
        await linkedinAccount.updateSettingsButton().click();
        await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    });

    test('Try to set max Post Like/Day grater than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxPostLikesDay('41');
        await expect(page.getByText('Value must be at most 40')).toBeVisible();
        //await linkedinAccount.updateSettingsButton().click();
    });
    test.only('Try to set max Post Like/Day less than 40', async ({ page }) => {
        await linkedinAccount.configureLimitButton();
        await linkedinAccount.maxPostLikesDay('39');
        await linkedinAccount.updateSettingsButton().click();
        await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    });

})

// npx playwright test tests/LinkedinAccountsTests/LinkedinAccountsTest.spec.js --project chromium --debug
