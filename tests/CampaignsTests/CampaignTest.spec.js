import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CampaignPage } from '../../pages/CampaignsPages/CampaignPage';
import testData from '../../testData/testData.json';

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type { CampaignPage } */
    let campaignButton;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.loginTestData.validEmail,testData.loginTestData.validPassword);
        campaignButton = new CampaignPage(page);
        await campaignButton.campaignButton();
        // create object for generate leads page
    })

    // test('If not select sender check the continue button',async ({page})=>{
    //     await campaignButton.createCampaign();
    //     await campaignButton.campaignName("Automation_campaign_test");
    //     const isChecked = await campaignButton.selectSender().isChecked();
    //     if(!isChecked){
    //         await expect(page.getByText('Continue')).toBeDisabled();
    //     }
    // })

    // test('Check try to save max follow/Day usng sender limit Value gratter than 40 ',async ({page})=>{
    //     await campaignButton.createCampaign();
    //     await campaignButton.campaignName("Automation_campaign_test");
    //     const senderLocator = await campaignButton.selectSender();
    //     await senderLocator.click();
    //     await campaignButton.senderLimitConfigure();
    //     await campaignButton.adjustSenderLimit('followDay');
    //     await campaignButton.adjustSenderLimit('messageDay');
    //     await campaignButton.adjustSenderLimit('InMailDay');
    //     await campaignButton.adjustSenderLimit('connectionRequestDay');
    //     await campaignButton.adjustSenderLimit('profileViewDay');
    //     await campaignButton.adjustSenderLimit('postLikeDay');
    // })   

    test('Check if not select lead least , continue button will disable',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        const senderLocator = await campaignButton.selectSender();
        await senderLocator.click();
        await campaignButton.senderLimitConfigure();
        await campaignButton.senderLimitSaveButton();
        await campaignButton.senderScedule();
        await campaignButton.senderSceduleCrossButton();
        await campaignButton.continueButton();
        //await campaignButton.selectLeadLeads('seedlink leads');
        await expect(page.getByText('Continue')).toBeDisabled();
    })
    test('Launch a successful campaign',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        const senderLocator = await campaignButton.selectSender();
        await senderLocator.click();
        await campaignButton.senderLimitConfigure();
        await campaignButton.senderLimitSaveButton();
        await campaignButton.senderScedule();
        await campaignButton.senderSceduleCrossButton();
        await campaignButton.continueButton();
        await campaignButton.selectLeadLeads('seedlink leads');
        await campaignButton.continueButton();
        await campaignButton.addActionButton();
        await campaignButton.ifOpenProfile();
        await campaignButton.continueButton();
        await campaignButton.launchCampaign();
        await expect(page.getByText('Campaign launched successfully')).toBeVisible({ timeout: 30000 });
    })

    // test('Check max connection Request Value must be at most 25',async ({page})=>{
    //     await campaignButton.createCampaign();
    //     await campaignButton.campaignName("Automation_campaign_test");
    //     await campaignButton.selectSender().click();
    //     await campaignButton.senderLimitConfigure();
    // })
    // test('Check max profile view Value must be at most 40',async ({page})=>{
    //     await campaignButton.createCampaign();
    //     await campaignButton.campaignName("Automation_campaign_test");
    //     await campaignButton.selectSender().click();
    //     await campaignButton.senderLimitConfigure();
    // })
    // test('Check max post likes Value must be at most 40',async ({page})=>{
    //     await campaignButton.createCampaign();
    //     await campaignButton.campaignName("Automation_campaign_test");
    //     await campaignButton.selectSender().click();
    //     await campaignButton.senderLimitConfigure();
    // })

})

// npx playwright test tests/CampaignsTests/CampaignTest.spec.js --project chromium --debug
