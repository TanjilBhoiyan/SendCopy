import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../../pages/leadsPages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../../pages/leadsPages/LinkedInSearchBarPage';
import testData from '../../testData/testData.json'

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type {LinkedinLeadsPage} */
    let linkedinleads;
    /**@type {GenerateLeadsPage} */
    let generateLeads;
    /** @type {LinkedInSearchBarPage} */
    let linkedinsearchbar;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.loginTestData.validEmail, testData.loginTestData.validPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();


        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
    })
    test('Verify to import leads using invalid search URL',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField(testData.linkedinLeads.listInputField);
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/p/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('URL must be a valid LinkedIn people search URL with keywords parameter')).toBeVisible();
    })
    test('Verify to import leads without enter search URL',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField(testData.linkedinLeads.listInputField);
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        //await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('Search URL is required')).toBeVisible();
    })
    test('Verify to import leads without enter List name',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.continueButton().click();
        //await linkedinsearchbar.listNameInputField(testData.linkedinLeads.listInputField);
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('List name is required')).toBeVisible();
    })
    // test.only('Verify using only number in name field',async ({page})=>{
    //     await linkedinleads.addLeadsButton();
    //     await generateLeads.continueButton().click();
    //     await linkedinsearchbar.listNameInputField('223423434533');
    //     await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
    //     await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
    //     await linkedinsearchbar.startImportButton().click();
    //     await expect(page.getByText('Started importing leads for search bar')).toBeVisible();
    // })
    test('Verify try to import leads without selecting any senders',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField(testData.linkedinLeads.listInputField);
        //await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('At least one sender must be selected')).toBeVisible();
    })
    test('Check the url will accept  if "PEOPLE" is capital letter',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('automation lead1');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/PEOPLE/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('Started importing leads for search bar')).toBeVisible();
    })
})
// npx playwright test tests/LinkedinSearchBarTest.spec.js --project chromium --headed

// ei file fully ok