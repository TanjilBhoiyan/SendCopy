import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import { LeadsDetailsPage } from '../../pages/leadsPages/LeadsDetailsPage';
import testData from '../../testData/testData.json';

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /**@type {LeadsDetailsPage} */
    let leadsDetailsPage;

    /** @type {LinkedinLeadsPage} */
    let linkedinleads;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.signupData.newValidEmail, testData.signupData.newPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();
        // create object for generate leads page
        leadsDetailsPage = new LeadsDetailsPage(page);
    })
    // test('Check total leads value is matched with inside the leads details',async ({page})=>{
    //     await linkedinleads.leads();
    //     await leadsDetailsPage.leadsDeleteIcon().click();

    // })
    test('Verify single lead delete option',async ({page})=>{
        await linkedinleads.leads().click();
        await page.waitForTimeout(1000);
        await leadsDetailsPage.leadsDeleteIcon().click();
        await page.waitForTimeout(1000);
        await leadsDetailsPage.leadsDeleteButton().click();
        await expect(page.getByText('Lead deleted successfully')).toBeVisible();
    })
    test('Verify the search leads functionality',async ({page})=>{
        await linkedinleads.leads().click();
        await leadsDetailsPage.searchLeads(testData.linkedinLeads.searchLeads);
        //await expect(await leadsDetailsPage.searchedRow()).toHaveCount(1);
        const rows = await leadsDetailsPage.searchedRow();
        await expect(rows.first()).toBeVisible();
    })
    test('Verify csv file will download after click on export to csv',async ({page})=>{
        await linkedinleads.leads().click();
        await leadsDetailsPage.exportToCSV().click();
        await expect(page.getByText('Preparing CSV export')).toBeVisible();
        await expect(page.getByText('Export successful')).toBeVisible();
    })

})

//  npx playwright test tests/LeadsDetailsTests.spec.js --project chromium --headed

// ei file ta fully ok
