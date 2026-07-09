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
    test('Launch a successful campaign',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        await campaignButton.selectSender().click();
        await campaignButton.senderLimitConfigure();
        await campaignButton.senderLimitSaveButton();
        await campaignButton.senderScedule();
        //await campaignButton.updateScheduleButton();
        await campaignButton.senderSceduleCrossButton();
        await campaignButton.continueButton();
        await campaignButton.selectLeadLeads('seedlink leads');
        await campaignButton.continueButton();
        await campaignButton.addActionButton();
        await campaignButton.ifOpenProfile();
        await campaignButton.continueButton();
        await campaignButton.launchCampaign();
        await expect(page.getByText('Campaign started successfully')).toBeVisible();
    })
    test('If not select sender check the continue button',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        const isChecked = await campaignButton.selectSender().isChecked();
        if(!isChecked){
            await expect(page.getByText('Continue')).toBeDisabled();
        }
    })
    test.only('Check sender limit Value must be at most 40 ',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        await campaignButton.selectSender().click();
        await campaignButton.senderLimitConfigure();
    })
    test.only('Check max message/day Value must be at most 40',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        await campaignButton.selectSender().click();
        await campaignButton.senderLimitConfigure();
    })
    test.only('Check max connection Request Value must be at most 25',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        await campaignButton.selectSender().click();
        await campaignButton.senderLimitConfigure();
    })
    test.only('Check max profile view Value must be at most 40',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        await campaignButton.selectSender().click();
        await campaignButton.senderLimitConfigure();
    })
    test.only('Check max post likes Value must be at most 40',async ({page})=>{
        await campaignButton.createCampaign();
        await campaignButton.campaignName("Automation_campaign_test");
        await campaignButton.selectSender().click();
        await campaignButton.senderLimitConfigure();
    })

})

// npx playwright test tests/CampaignsTests/CampaignTest.spec.js --project chromium --debug
