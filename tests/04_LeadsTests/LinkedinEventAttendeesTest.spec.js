// import { test , expect } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
// import { GenerateLeadsPage } from '../../pages/leadsPages/GenerateLeadsPage';
// import { LinkedinEventAttendeesPage} from '../../pages/leadsPages/LinkedInEventAttendeesPage';
// import testData from '../../testData/testData.json'


// test.describe.configure({mode:'serial'});

// test.describe('Linkedin Leads Test',()=>{
//     /**@type {LinkedinEventAttendeesPage} */
//     let linkedineventattendees;
//     /** @type {LinkedinLeadsPage} */
//     let linkedinleads;
//     /**@type {GenerateLeadsPage} */
//     let generateLeads;
//     test.beforeEach(async ({page})=>{
//         const login = new LoginPage(page);
//         await login.gotoLoginPage();
//         await login.login(testData.loginTestData.validEmail,testData.loginTestData.validPassword);
//         linkedinleads = new LinkedinLeadsPage(page);
//         await linkedinleads.linkedinLeadsLink();

//         // create object for generate leads page
//         generateLeads = new GenerateLeadsPage(page);
//         linkedineventattendees = new LinkedinEventAttendeesPage(page);
//     })
//     test.only('Verify event attendees without enter list name input' ,async ({page})=>{
//         await linkedinleads.addLeadsButton();
//         await generateLeads.linkedinEventAttendees().click();
//         await generateLeads.continueButton().click();
//         //await linkedineventattendees.listNameInputField(testData.linkedinLeads.event_leads);
//         await linkedineventattendees.selectSenderName(testData.linkedinLeads.shakilBhuiyan);
//         await linkedineventattendees.eventAttendeesUrlInput(testData.linkedinLeads.NotUrl);
//         await linkedineventattendees.startImportButton().click();
//         await expect(page.getByText('List name is required')).toBeVisible();
//     })
//     test('Verify event attendees without select sender name' ,async ({page})=>{
//         await linkedinleads.addLeadsButton();
//         await generateLeads.linkedinEventAttendees().click();
//         await generateLeads.continueButton().click();
//         await linkedineventattendees.listNameInputField(testData.linkedinLeads.event_leads);
//         //await linkedineventattendees.selectSenderName(testData.linkedinEventAttendes.selectSenderName);
//         await linkedineventattendees.eventAttendeesUrlInput(testData.linkedinLeads.NotUrl);
//         await linkedineventattendees.startImportButton().click();
//         await expect(page.getByText('At least one sender must be selected')).toBeVisible();
//     })
//     test('Verify using invalid Event (Attendees) url',async ({page})=>{
//         await linkedinleads.addLeadsButton();
//         await generateLeads.linkedinEventAttendees().click();
//         await generateLeads.continueButton().click();
//         await linkedineventattendees.listNameInputField(testData.linkedinLeads.event_leads);
//         await linkedineventattendees.selectSenderName(testData.linkedinLeads.selectSenderName);
//         await linkedineventattendees.eventAttendeesUrlInput('https://www.linkedin.com/voyager/api/variables=(start:0,origin:EVENT_PAGE_CANNED_SEARCH,query:(flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:eventAttending,value:List(7408867606096437249)),(key:resultType,value:List(PEOPLE))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.ef3d0937fb65bd7812e32e5a85028e79');
//         await linkedineventattendees.startImportButton().click();
//         await expect(page.getByText('URL must be a valid LinkedIn GraphQL API URL')).toBeVisible();
//     })
//     test('Verify using url which is not a url' ,async ({page})=>{
//         await linkedinleads.addLeadsButton();
//         await generateLeads.linkedinEventAttendees().click();
//         await generateLeads.continueButton().click();
//         await linkedineventattendees.listNameInputField(testData.linkedinLeads.event_leads);
//         await linkedineventattendees.selectSenderName(testData.linkedinLeads.selectSenderName);
//         await linkedineventattendees.eventAttendeesUrlInput(testData.linkedinLeads.NotUrl);
//         await linkedineventattendees.startImportButton().click();
//         await expect(page.getByText('Please enter a valid URL')).toBeVisible();
//     })
// })
// // npx playwright test tests/LinkedinEventAttendeesTest.spec.js --project chromium --headed