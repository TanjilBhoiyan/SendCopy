import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LinkedinLeadsPage } from '../pages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../pages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../pages/LinkedInSearchBarPage';
import { LinkedinSearchCompanies } from '../pages/LinkedInSearchCompaniesPage';


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
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
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
        await linkedinsearchbar.selectSenderName('Shakil Bhuiyan');
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
        await linkedinsearchbar.selectSenderName('Shakil Bhuiyan');
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
        await linkedinsearchbar.selectSenderName('Shakil Bhuiyan');
        await linkedinsearchcompanies.searchQueryInput('');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('Keyword is required')).toBeVisible();       
    })
})