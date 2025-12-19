import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LinkedinLeadsPage } from '../pages/LinkedinLeadsPage';


test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type {LinkedinLeadsPage} */

    let linkedinleads;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinleadLink();
        
    })

    test('Verify Leads lists Seacrch ',async ({page})=>{
        await linkedinleads.searchlist('event');
        const row = await linkedinleads.getRow('event');
        const noResult = await linkedinleads.noRresultVisible();
        if(await row.count()>0){
            console.log('Item found');
            await expect(row.first()).toBeVisible();
        }
        else{
            console.log('No Result');
            await expect(noResult).toBeVisible();
        }
    })
    test.only('search filter',async ({page})=>{
        //page.waitForTimeout(3000);
        await linkedinleads.searchlist('djflal');
        // await page.pause();
        //console.log(linkedinleads);
        await linkedinleads.allListname().first().waitFor({ state: 'visible', timeout: 5000 });
        const searchitemrows = await linkedinleads.allListname().all();
        //await page.pause();
        const searchRowCount = searchitemrows.length;
        if(searchRowCount>1){
            for(const searchitemrow of searchitemrows){
                const leadCount=Number(await linkedinleads.leadNumber(searchitemrow).innerText());
                //console.log(leadCount);
                expect(leadCount).toBeGreaterThan(1);
            }
        }
        else{
            console.log('No Result');
            await expect(page.getByText('No Result')).toBeVisible();
        }
    })
})

// npx playwright test tests/LinkedinLeadsPageTest.spec.js --project chromium --headed