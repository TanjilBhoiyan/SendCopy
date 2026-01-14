import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AnalyticsPage } from '../../pages/AnalyticsPages/AnalyticsPage';

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type { AnalyticsPage } */
    let analyticsButton;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        analyticsButton = new AnalyticsPage(page);
        await analyticsButton.analyticsButton();

        // create object for generate leads page
    })
    test('',async ({page})=>{
        
    })
})

// npx playwright test tests/ChatsTests/messageTest.spec.js --project chromium --debug
