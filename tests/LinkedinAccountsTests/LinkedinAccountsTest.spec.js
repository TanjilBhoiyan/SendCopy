import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinAccountPage } from '../../pages/LinkedInAccountsPages/LinkedinAccountPage';
import testData from '../../testData/testData.json';


test.describe.configure({mode:'default'});

test.describe('Linkedin Leads Test',()=>{
    /** @type {LinkedinAccountPage} */
    let linkedinAccount;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.loginTestData.validEmail , testData.loginTestData.validPassword);
        linkedinAccount = new LinkedinAccountPage(page);
        await linkedinAccount.linkedinAccountButton();

        // create object for generate leads page
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
    // test.only('Try to connect using wrong linkedin email',async ({page})=>{
    //     await linkedinAccount.connectAccountButton().click();
    //     await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.wrong_linkedin_email);
    //     await linkedinAccount.linkedinPasswordInput(testData.linkedinAccountSPages.validPassword);
    //     await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
    //     await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
    //     await linkedinAccount.connectAccount().click();
    //     await expect(page.getByText('Invalid credentials')).toBeVisible();
    // })
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
    // connect with credential
    // test.only('Try to connect using valid email and password',async ({page})=>{
    //     await linkedinAccount.connectAccountButton().click();
    //     await linkedinAccount.linkedinEmailAddressInput(testData.linkedinAccountSPages.valid_linkedin_email);
    //     await linkedinAccount.linkedinPasswordInput('Tanjil123@#?');
    //     await linkedinAccount.inboxPrivacyConfiguration(testData.linkedinAccountSPages.select_conversation);
    //     await linkedinAccount.selectCountry(testData.linkedinAccountSPages.without_proxy_country);
    //     await linkedinAccount.connectAccount().click();
    //     await expect(page.getByText('Login Successfull')).toBeVisible();
    // })

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
        await linkedinAccount.liatValueInput(testData.linkedinAccountSPages.invalid_LIAT_token);
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
    test('Check the connect account modal opens properly',async ({page})=>{
        await linkedinAccount.connectAccountButton().click();
        await expect(linkedinAccount.connectAccountModal()).toBeVisible();
    })
    // test.only('Check after click on purchase seats button go to Billing page',async ({page})=>{
    //     await linkedinAccount.purchaseSeatsButton().click();
    //     await expect(page).toHaveURL('https://qaapp.sendcopy.ai/settings/billing');
    // })
    test('Configure proxy feature when verification required', async ({ page }) => {
        if(await linkedinAccount.verificationRequired().isVisible()){
            await linkedinAccount.threeDotButton();
            await expect(await linkedinAccount.threeDotButton()).toHaveCount(1);
        }
        else{
            console.log('Verification not found, skipping Configure proxy feature');
        }
    });
    test('Configure LinkedIn Account Proxy feature visible', async ({ page }) => {
        if(await linkedinAccount.verificationRequired().isVisible()){
            await linkedinAccount.threeDotButton().click();
            await expect(await linkedinAccount.threeDotButton()).toHaveCount(1);
            await linkedinAccount.configureProxyButton().click();
            await expect(await linkedinAccount.verifyYourProxySection()).toHaveCount(1);
        }
        // else{
        //     console.log('Verification not found, skipping Configure proxy feature');
        // }
    });

    test('Check if select Linkedin Conversavtion from configure Inbox privacy,should showing all linkedin conversation in unibox', async ({ page }) => {
        const connectedRow = await linkedinAccount.getLinkedinAccountStatus('Connected');
        console.log(connectedRow);
        if(connectedRow){
            await connectedRow.locator('button').last().click();
        }
        await linkedinAccount.InboXPrivacyConfiguration().click();
        await linkedinAccount.choosePrivacyMode('Track and import all LinkedIn conversations');
        await expect(page.getByText('Inbox privacy configured successfully')).toBeVisible();
    });
    // test.only('Check if select Linkedin conversations started from SendCopy,should showing all linkedin conversation in unibox', async ({ page }) => {
    //     const connectedRow = await linkedinAccount.getLinkedinAccountStatus('Connected');
    //     if(connectedRow){
    //         await connectedRow.locator('button').last().click();
    //     }
    //     await linkedinAccount.InboXPrivacyConfiguration().click();
    //     await linkedinAccount.choosePrivacyMode('Track only conversations started from SendCopy');
    //     await expect(page.getByText('Inbox privacy configured successfully')).toBeVisible();
    // });

    // test.only('Try to set max follows/Day grater than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxFollowDay('41');
    //     await expect(page.getByText('Value must be at most 40')).toBeVisible();
    //     //await linkedinAccount.updateSettingsButton().click();
    // });
    // test('Try to set max follows/Day less than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxFollowDay('38');
    //     await linkedinAccount.updateSettingsButton().click();
    //     await expect(page.getByText('account limits updated successfully')).toBeVisible();
    // });
    // test('Try to set max message/Day grater than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxMessageDay('41');
    //     await expect(page.getByText('Value must be at most 40')).toBeVisible();
    //     //await linkedinAccount.updateSettingsButton().click();
    // });
    // test('Try to set max message/Day less than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxMessageDay('39');
    //     await linkedinAccount.updateSettingsButton().click();
    //     await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    // });

    // test('Try to set max InMail/Day grater than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.inMailMessageDay('41');
    //     await expect(page.getByText('Value must be at most 40')).toBeVisible();
    //     //await linkedinAccount.updateSettingsButton().click();
    // });
    // test('Try to set max InMail/Day less than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.inMailMessageDay('39');
    //     await linkedinAccount.updateSettingsButton().click();
    //     await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    // });
    // test.only('Try to set max Connection Request/Day grater than 25', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxConnectionRequestDay('26');
    //     await expect(page.getByText('Value must be at most 40')).toBeVisible();
    //     //await linkedinAccount.updateSettingsButton().click();
    // });
    // test('Try to set max Connection Request/Day less than 25', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxConnectionRequestDay('24');
    //     await linkedinAccount.updateSettingsButton().click();
    //     await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    // });
    // test('Try to set max Profile Views/Day grater than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxProfileViewsDay('41');
    //     await expect(page.getByText('Value must be at most 40')).toBeVisible();
    //     //await linkedinAccount.updateSettingsButton().click();
    // });
    // test('Try to set max Profile Views/Day less than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxProfileViewsDay('39');
    //     await linkedinAccount.updateSettingsButton().click();
    //     await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    // });

    // test('Try to set max Post Like/Day grater than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxPostLikesDay('41');
    //     await expect(page.getByText('Value must be at most 40')).toBeVisible();
    //     //await linkedinAccount.updateSettingsButton().click();
    // });
    // test('Try to set max Post Like/Day less than 40', async ({ page }) => {
    //     await linkedinAccount.configureLimitButton();
    //     await linkedinAccount.maxPostLikesDay('39');
    //     await linkedinAccount.updateSettingsButton().click();
    //     await expect(page.getByText('Account limits updated successfully')).toBeVisible();
    // });
    // test.only('Check when user want to see only Connected accounts', async ({ page }) => {
    //     await linkedinAccount.statusFilterDropdown();
    //     await linkedinAccount.connectedStatus('Connected');
    //     //await linkedinAccount.connectedAccount('Connected');
    //     expect(await linkedinAccount.accountFilter('Connected')).toBeTruthy();
    // });
    // test.only('Check when user want to see only Not Connected accounts', async ({ page }) => {
    //     await linkedinAccount.statusFilterDropdown();
    //     await linkedinAccount.notConnectedStatus('Not Connected');
    //     const result = await linkedinAccount.accountFilter('Not Connected');
    //     //expect(await linkedinAccount.connectedAccount('Not Connected')).toBeTruthy();
    //     expect(result === true || result ==='No accounts found').toBeTruthy();
    // });
    // test.only('Check when user want to see only In Campaign accounts', async ({ page }) => {
    //     await linkedinAccount.statusFilterDropdown();
    //     await linkedinAccount.inCampaignStatus('In Campaign');
    //     const result = await linkedinAccount.accountFilter('In Campaign');
    //     //expect(await linkedinAccount.connectedAccount('Not Connected')).toBeTruthy();
    //     expect(result === true || result ==='No accounts found').toBeTruthy();
    // });
    // test.only('Check when user want to see only Inactive accounts', async ({ page }) => {
    //     await linkedinAccount.statusFilterDropdown();
    //     await linkedinAccount.inActiveStatus('Inactive');
    //     const result = await linkedinAccount.accountFilter('Inactive');
    //     //expect(await linkedinAccount.connectedAccount('Not Connected')).toBeTruthy();
    //     expect(result === true || result ==='No accounts found').toBeTruthy();
    // });
    // test.only('Remove linkedin account from Linkedin Account page', async ({ page }) => {
    //     await linkedinAccount.threeDotButton().click();
    //     await linkedinAccount.removeAccountButton();
    //     await linkedinAccount.removeAccountRedButton().click();
    //     await expect(page.getByText('LinkedIn account disconnected successfully')).toBeVisible();
    // });
})

// npx playwright test tests/LinkedinAccountsTests/LinkedinAccountsTest.spec.js --project chromium --debug
