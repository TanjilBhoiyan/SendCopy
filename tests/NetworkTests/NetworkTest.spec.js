import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { NetworkPage } from '../../pages/NetworkPages/NetworkPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import testData from '../../testData/testData.json'


test.describe.configure({mode:'default'});

test.describe('Linkedin Leads Test',()=>{
    /** @type { NetworkPage } */
    let network;
    /** @type { LinkedinLeadsPage } */
    let linkedinLeads;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.loginTestData.validEmail , testData.loginTestData.validPassword);
        network = new NetworkPage(page);
        await network.networkButton();
    })
    test('Check showing full headline for connected linkedin account holder',async ({page})=>{
        await network.headline().hover();
        const tooltip = network.headlineTooltip();
        await expect(tooltip).toBeVisible();
    })
    test('Click on select mode switch button ,check check box are showing or not ',async ({page})=>{
        await network.selectModeSwitch();
        await expect(network.leadNameCheckBox()).toBeVisible();
    })
    test('After click on checkbox button , should visible clear selection button and add to list button',async ({page})=>{
        await network.selectModeSwitch();
        await network.leadNameCheckBox().click();
        await expect(network.clearSelectionButton()).toBeEnabled();
        await expect(network.addToListButton()).toBeEnabled();
    })
    test('After click on Add to list Should appear a popup "Save my network leads to new list"',async ({page})=>{
        await network.selectModeSwitch();
        await network.leadNameCheckBox().click();
        await network.addToListButton().click();
        await expect(network.newListPopUp()).toBeVisible();
    })
    test('Save my network leads to new list',async ({page})=>{
        await network.selectModeSwitch();
        await network.leadNameCheckBox().click();
        await network.addToListButton().click();
        await network.listNameInputBox(testData.networkTestData.myNetworkList);
        await network.listNameConfirmButton().click();
        await expect(page.getByText('Lead List Created Successfully from My Network')).toBeVisible();

        linkedinLeads = new LinkedinLeadsPage(page);
        await linkedinLeads.linkedinLeadsLink();
        const newLeadsName= await linkedinLeads.leads().innerText();
        console.log(newLeadsName);
        expect(newLeadsName).toContain(testData.networkTestData.myNetworkList);
    })


    test('After click on clear selection button verify checked name will be unchecked',async ({page})=>{
        await network.selectModeSwitch();
        await network.leadNameCheckBox().click();
        await network.clearSelectionButton().click();
        await expect(network.leadNameCheckBox()).not.toBeChecked();
    })
    // test.only('Verify filter by account ',async ({page})=>{
        
    // })
    test('check the lead name after inter a lead name in search by keywords field',async ({page})=>{
        const leadName = await network.searchByKeyword(testData.networkTestData.searchByKeyword);
        console.log(leadName);
        await expect(leadName).toContain(testData.networkTestData.searchByKeyword);
    })

})

// npx playwright test tests/NetworkTests/NetworkTest.spec.js --project chromium --debug
