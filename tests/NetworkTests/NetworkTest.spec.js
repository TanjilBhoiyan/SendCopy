import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { NetworkPage } from '../../pages/NetworkPages/NetworkPage';


test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type { NetworkPage } */
    let network;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        network = new NetworkPage(page);
        await network.networkButton();

        // create object for generate leads page
    })
    test('',async ({page})=>{
    })
})

// npx playwright test tests/NetworkTests/NetworkTest.spec.js --project chromium --debug
