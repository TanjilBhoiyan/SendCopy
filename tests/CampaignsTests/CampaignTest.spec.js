import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CampaignPage } from '../../pages/CampaignsPages/CampaignPage';


test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type { CampaignPage } */
    let campaignButton;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        campaignButton = new CampaignPage(page);
        await campaignButton.campaignButton();

        // create object for generate leads page
    })
    test('',async ({page})=>{
        
    })
})

// npx playwright test tests/CampaignsTests/CampaignTest.spec.js --project chromium --debug
