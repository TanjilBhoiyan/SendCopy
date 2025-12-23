import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LinkedinLeadsPage } from '../pages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../pages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../pages/LinkedInSearchBarPage';
import { LinkedinEventAttendeesPage} from '../pages/LinkedInEventAttendeesPage'

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /**@type {LinkedinEventAttendeesPage} */
    let linkedineventattendees;
    /** @type {LinkedinLeadsPage} */
    let linkedinleads;
    /**@type {GenerateLeadsPage} */
    let generateLeads;
    /** @type {LinkedInSearchBarPage} */
    let linkedinsearchbar;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinleadLink();


        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
        linkedineventattendees = new LinkedinEventAttendeesPage(page);
    })
    test('Verify Succssful lead import from LinkedIn Search Bar',async ({page})=>{
        await linkedinleads.addleadsbutton();
        await generateLeads.continuebutton().click();
        await linkedinsearchbar.listnameinputfield('automation lead1');
        await linkedinsearchbar.selectsendername('Shakil Bhuiyan')
        //await page.waitForTimeout(20000);
        await linkedinsearchbar.searchurlinput('https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startimportbutton().click();
        await expect(page.getByText('Started importing leads for search bar')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    // test.only('Verify Succssful lead import from LinkedIn Recruiter',async ({page})=>{

    // })

    test('Verify Succssful lead import from LinkedIn Event (Attendees)',async ({page})=>{
        await linkedinleads.addleadsbutton();
        await generateLeads.linkedineventattendees().click();
        await generateLeads.continuebutton().click();
        await linkedineventattendees.listnameinputfield('Event_leads');
        await linkedineventattendees.selectsendername('Shakil Bhuiyan');
        await linkedineventattendees.eventattendeesurlinput('https://www.linkedin.com/voyager/api/graphql?variables=(start:0,origin:EVENT_PAGE_CANNED_SEARCH,query:(flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:eventAttending,value:List(7408867606096437249)),(key:resultType,value:List(PEOPLE))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.ef3d0937fb65bd7812e32e5a85028e79');
        await linkedineventattendees.startimportbutton().click();
    })
    test('Verify Succssful lead import from LinkedIn Post (Reactors)',async ({page})=>{
        await linkedinleads.addleadsbutton();
        await generateLeads.linkedinpostreactors().click();
        await generateLeads.continuebutton().click();
        await linkedinsearchbar.listnameinputfield('Post reactor lead 3');
        await linkedinsearchbar.selectsendername('Shakil Bhuiyan')
        await linkedinsearchbar.searchurlinput('https://www.linkedin.com/posts/universal-software_were-hiring-universal-software-is-looking-activity-7400149143756808192-jPI2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEy3CcIBdOxcMO3UPmoZ-lvSiLjZgjOsA0A');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startimportbutton().click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('Success')).toBeVisible();
    })
    // test.only('Verify Succssful lead import from LinkedIn Search (Companies)',async ({page})=>{
        
    // })
    // test.only('Verify Succssful lead import from Import from CSV',async ({page})=>{

    // })
    // test.only('Verify Succssful lead import from Sales Navigator (Leads)',async ({page})=>{
        
    // })
    // test.only('Verify Succssful lead import from Sales Navigator (Accounts)',async ({page})=>{

    // })


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
    test('search filter',async ({page})=>{
        await linkedinleads.searchlist('Company');
        await linkedinleads.allListname().first().waitFor({ state: 'visible', timeout: 5000 });
        const searchitemrows = await linkedinleads.allListname().all();
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

    test('Verify Add leads button is Enabled',async ()=>{
        await expect(await linkedinleads.addleadsbutton()).toBeVisible();
        await expect(await linkedinleads.addleadsbutton()).toBeEnabled();
    })




    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })
    // test.only('',async ({page})=>{

    // })
    // test.only('',async ({page})=>{
        
    // })

})

// npx playwright test tests/LinkedinLeadsPageTest.spec.js --project chromium --headed