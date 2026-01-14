import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinAccountPage } from '../../pages/LinkedInAccountsPages/LinkedinAccountPage';


test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type {LinkedinAccountPage} */
    let linkedinAccount;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        linkedinAccount = new LinkedinAccountPage(page);
        await linkedinAccount.linkedinAccountButton();

        // create object for generate leads page
    })
    test('',async ({page})=>{
    })
})

// npx playwright test tests/LinkedinAccountsTests/LinkedinAccountsTest.spec.js --project chromium --debug
