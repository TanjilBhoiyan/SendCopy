import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../../pages/leadsPages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../../pages/leadsPages/LinkedInSearchBarPage';
import { LinkedinEventAttendeesPage} from '../../pages/leadsPages/LinkedInEventAttendeesPage';
import { LinkedinSearchCompanies } from '../../pages/leadsPages/LinkedInSearchCompaniesPage';
import { ImprtFromCSVPage } from '../../pages/leadsPages/ImportFromCSVPage';
import testData from '../../testData/testData.json'


test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /**@type {ImprtFromCSVPage} */
    let imprtfromcsvpage;
    /**@type {LinkedinSearchCompanies} */
    let linkedinsearchcompanies;
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
        await login.login(testData.loginTestData.validEmail , testData.loginTestData.validPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();


        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
        linkedineventattendees = new LinkedinEventAttendeesPage(page);
        linkedinsearchcompanies = new LinkedinSearchCompanies(page);
        imprtfromcsvpage = new ImprtFromCSVPage(page);
    })
    test('Verify Succssful lead import from LinkedIn Search Bar',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('automation lead1');
        await linkedinsearchbar.selectSenderName(testData.linkedinEventAttendes.selectSenderName);
        //await page.waitForTimeout(20000);
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&sid=-Tu');
        await linkedinsearchbar.startImportButton().click();
        await expect(page.getByText('Started importing leads for search bar')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    // test.only('Verify Succssful lead import from LinkedIn Recruiter',async ({page})=>{

    // })

    test('Verify Succssful lead import from LinkedIn Event (Attendees)',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinEventAttendees().click();
        await generateLeads.continueButton().click();
        await linkedineventattendees.listNameInputField(testData.linkedinLeads.event_leads);
        await linkedineventattendees.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedineventattendees.eventAttendeesUrlInput('https://www.linkedin.com/voyager/api/graphql?variables=(start:0,origin:EVENT_PAGE_CANNED_SEARCH,query:(flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:eventAttending,value:List(7408867606096437249)),(key:resultType,value:List(PEOPLE))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.ef3d0937fb65bd7812e32e5a85028e79');
        await linkedineventattendees.startImportButton().click();
        await expect(page.getByText('Started importing leads for linkedin event')).toBeVisible();
    })
    test('Verify Succssful lead import from LinkedIn Post (Reactors)',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinPostReactors().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Post reactor lead 3');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName)
        await linkedinsearchbar.searchUrlInput('https://www.linkedin.com/posts/universal-software_were-hiring-universal-software-is-looking-activity-7400149143756808192-jPI2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEy3CcIBdOxcMO3UPmoZ-lvSiLjZgjOsA0A');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('Success')).toBeVisible();
        //await expect(page.getByText('Started importing leads for linkedin post reactors')).toBeVisible();
    })
    test('Verify Succssful lead import from LinkedIn Search (Companies)',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.linkedinSearchCompanies().click();
        await generateLeads.continueButton().click();
        await linkedinsearchbar.listNameInputField('Companies lead 1');
        await linkedinsearchbar.selectSenderName(testData.linkedinLeads.selectSenderName);
        await linkedinsearchcompanies.searchQueryInput('Chocolate');
        await page.waitForTimeout(2000);
        await linkedinsearchbar.startImportButton().click();
        //await page.waitForTimeout(2000);
        await expect(page.getByText('Success')).toBeVisible();       
    })

    test('Verify Succssful People Lead Import from Import from CSV',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.firstDropdownItem(testData.linkedinLeads.profileUrl);
        await imprtfromcsvpage.secondDropdownItem(testData.linkedinLeads.firstName);
        await imprtfromcsvpage.thirdDropdownItem(testData.linkedinLeads.lastName);
        await imprtfromcsvpage.fourthDropdownItem(testData.linkedinLeads.location);
        await imprtfromcsvpage.fifthDropdownItem(testData.linkedinLeads.headline);
        await imprtfromcsvpage.sixthDropdownItem(testData.linkedinLeads.company);
        await imprtfromcsvpage.seventhDropdownItem(testData.linkedinLeads.about);
        await imprtfromcsvpage.eighthDropdownItem(testData.linkedinLeads.emailAddress);
        await imprtfromcsvpage.createEmptyList(testData.linkedinLeads.peopleImportedLeads);
        await imprtfromcsvpage.importLeadsButton().click();
        await expect(page.getByText('Success')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    test('Verify Succssful Company Lead Import from Import from CSV',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.companyButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\company leads.csv');
        await imprtfromcsvpage.firstDropdownItem(testData.linkedinLeads.companyName);
        await imprtfromcsvpage.secondDropdownItem(testData.linkedinLeads.companyURL);
        await imprtfromcsvpage.thirdDropdownItem(testData.linkedinLeads.profileUrl);
        await imprtfromcsvpage.fourthDropdownItem(testData.linkedinLeads.location);
        await imprtfromcsvpage.fifthDropdownItem(testData.linkedinLeads.headline);
        await imprtfromcsvpage.sixthDropdownItem(testData.linkedinLeads.about);
        await imprtfromcsvpage.seventhDropdownItem(testData.linkedinLeads.emailAddress);
        await imprtfromcsvpage.createEmptyList(testData.linkedinLeads.companyImportedLeads);
        await imprtfromcsvpage.importLeadsButton().click();
        await expect(page.getByText('Success')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    // test.only('Verify Succssful lead import from Sales Navigator (Leads)',async ({page})=>{
        
    // })
    // test.only('Verify Succssful lead import from Sales Navigator (Accounts)',async ({page})=>{

    // })

    test('Verify Leads lists Seacrch ',async ({page})=>{
        await linkedinleads.searchList('event');
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
        await linkedinleads.searchList('Company');
        await linkedinleads.allListName().first().waitFor({ state: 'visible', timeout: 5000 });
        const searchitemrows = await linkedinleads.allListName().all();
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
        await expect(await linkedinleads.addLeadsButton()).toBeVisible();
        await expect(await linkedinleads.addLeadsButton()).toBeEnabled();
    })
    test('Verify delete button inside the three dots',async ({page})=>{
        await linkedinleads.threeDotButton().click();
        await linkedinleads.leadListDeleteButton().click();
        await linkedinleads.deleteListConfirmButton().click();
        await expect(page.getByText('Lead list deleted successfully')).toBeVisible();
    })
    test('Verify Rename button inside the three dots',async ({page})=>{
        await linkedinleads.threeDotButton().click();
        await linkedinleads.leadListRename().click();
        await linkedinleads.newListNameInput().clear();
        await linkedinleads.newListNameInput().fill(testData.linkedinLeads.newListNameInput);
        await linkedinleads.renameButton().click();
        await expect(page.getByText('Lead list renamed successfully')).toBeVisible();
    })
    test('Verify Export from CSV list inside the three dots',async ({page})=>{
        await linkedinleads.threeDotButton().click();
        await linkedinleads.exportFromCSV().click();
        await expect(page.getByText('Export successful')).toBeVisible();
    })

    test('Verify Exclude from list inside the three dots',async ({page})=>{
        await linkedinleads.threeDotButton().click();
        await linkedinleads.excludeFromList('post reactor4');
        await expect(page.getByText('Lead lists excluded successfully')).toBeVisible();
    })
    test('Verify Intersect lists inside the three dots',async ({page})=>{
        await linkedinleads.threeDotButton().click();
        await linkedinleads.intersectLists('Post reactor lead 2');
        await expect(page.getByText('Lead lists intersected successfully')).toBeVisible();
    })
    test('Verify Combine lists inside the three dots',async ({page})=>{
        await linkedinleads.threeDotButton().click();
        await linkedinleads.combineLists(testData.linkedinLeads.peopleImportedLeads);
        await expect(page.getByText('Lead lists combined successfully')).toBeVisible();
    })










    




    // test.only('Verify Export from CSV inside the three dots',async ({page})=>{

    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{
        
    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{

    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{
        
    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{

    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{
        
    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{

    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{
        
    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{

    // })
    // test.only('Verify delete button inside the three dots',async ({page})=>{
        
    // })

})

// npx playwright test tests/LinkedinLeadsPageTest.spec.js --project chromium --headed