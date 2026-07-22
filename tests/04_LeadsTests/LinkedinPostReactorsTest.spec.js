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
        await login.login(testData.loginTestData.validEmail,testData.loginTestData.validPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();


        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
    })
    test('Verify without using Post (Reactors) list name',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinPostReactors().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName)
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/posts/universal-software_were-hiring-universal-software-is-looking-activity-7400149143756808192-jPI2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEy3CcIBdOxcMO3UPmoZ-lvSiLjZgjOsA0A');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('List name is required')).toBeVisible();
        //await expect(page.getByText('Started importing leads for linkedin post reactors')).toBeVisible();
    })
    test('Verify without select any sender',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinPostReactors().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Post reactor lead 3');
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/posts/universal-software_were-hiring-universal-software-is-looking-activity-7400149143756808192-jPI2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEy3CcIBdOxcMO3UPmoZ-lvSiLjZgjOsA0A');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('At least one sender must be selected')).toBeVisible();
    })
    test('Verify using invalid Post Reactors URL',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinPostReactors().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Post reactor lead 3');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName)
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/universal-software_were-hiring-universal-software-is-looking-activity-7400149143756808192-jPI2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEy3CcIBdOxcMO3UPmoZ-lvSiLjZgjOsA0A');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('URL must be a valid LinkedIn post URL')).toBeVisible();
    })
    test('Verify using a url which is not a url',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinPostReactors().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Post reactor lead 3');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName)
        await linkedinsearchbar.searchUrlInput(testData.linkedinLeads.NotUrl);
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('Please enter a valid URL')).toBeVisible();
    })
})

// npx playwright test tests/LinkedinPostReactorsTest.spec.js --project chromium --headed


// ei file fully ok
