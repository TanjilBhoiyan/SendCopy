import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../../pages/leadsPages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../../pages/leadsPages/LinkedInSearchBarPage';
import { LinkedinSearchCompanies } from '../../pages/leadsPages/LinkedInSearchCompaniesPage';
import testData from '../../testData/testData.json'

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /**@type {LinkedinSearchCompanies} */
    let linkedinsearchcompanies;
    /** @type {LinkedinLeadsPage} */
    let linkedinleads;
    /**@type {GenerateLeadsPage} */
    let generateLeads;
    /** @type {LinkedInSearchBarPage} */
    let linkedinsearchbar;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.loginTestData.validEmail,testData.loginTestData.validPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();

        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
        linkedinsearchcompanies = new LinkedinSearchCompanies(page);
    })

    test('Verify withour inter any list name ',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinSearchCompanies().click();
        await generateLeads.continueButton().click();
        //await linkedinsearchbar.listNameInputField('Companies lead 1');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchcompanies.searchQueryInput('Chocolate');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('List name is required')).toBeVisible();       
    })
    test('Verify without selecting any sender name',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinSearchCompanies().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Companies lead 1');
        await linkedinsearchcompanies.searchQueryInput('Chocolate');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('At least one sender must be selected')).toBeVisible();       
    })
    test('Verify not inter any keyword in search query field',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinSearchCompanies().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Companies lead 1');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchcompanies.searchQueryInput('');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('Keyword is required')).toBeVisible();       
    })
})

// npx playwright test tests/LinkedinSearchCompaniesTest.spec.js --project chromium --headed