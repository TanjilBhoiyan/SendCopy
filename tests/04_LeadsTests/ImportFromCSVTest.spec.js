import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../../pages/leadsPages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../../pages/leadsPages/LinkedInSearchBarPage';
import { ImprtFromCSVPage } from '../../pages/leadsPages/ImportFromCSVPage';
import testData from '../../testData/testData.json'



test.describe.configure({mode:'default'});

test.describe('Linkedin Leads Test',()=>{
    /**@type {ImprtFromCSVPage} */
    let imprtfromcsvpage;
    /** @type {LinkedinLeadsPage} */
    let linkedinleads;
    /**@type {GenerateLeadsPage} */
    let generateLeads;
    /** @type {LinkedInSearchBarPage} */
    let linkedinsearchbar;


    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login(testData.signupData.newValidEmail, testData.signupData.newPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();


        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
        imprtfromcsvpage = new ImprtFromCSVPage(page);
    })
    test('Verify upload spreadsheet button is visible or not',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        const uploadBtn = page.getByRole('button', { name: 'Upload spreadsheet' });
        await expect(uploadBtn).toBeVisible();
        await expect(uploadBtn).toBeEnabled();
        //await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
    })
    test('Verify all UI element are showing after upload a file',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await expect(page.getByText('Map LinkedIn Profile Url field from: *')).toBeVisible();
        await expect(page.getByText('Map First Name field from: *')).toBeVisible();
        await expect(page.getByText('Map Last Name field from: *')).toBeVisible();
        await expect(page.getByText('Map Location field from:')).toBeVisible();
        await expect(page.getByText('Map Headline field from:')).toBeVisible();
        await expect(page.getByText('Map Company Name field from:')).toBeVisible();
        await expect(page.getByText('Map About field from:')).toBeVisible();
        await expect(page.getByText('Map Email Address field from:')).toBeVisible();
        await expect(page.getByText('Custom Variables')).toBeVisible();
    })
    test('Verify cross button work functionality after upload a csv file',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await expect(imprtfromcsvpage.crossButton()).toBeVisible();
        await expect(imprtfromcsvpage.crossButton()).toBeEnabled();
    })
    test('Try to import leads without selecting LinkedIn Profile Url',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        //await imprtfromcsvpage.firstDropdownItem('Profile URL');
        await imprtfromcsvpage.secondDropdownItem(testData.linkedinLeads.firstName);
        await imprtfromcsvpage.thirdDropdownItem(testData.linkedinLeads.lastName);
        await imprtfromcsvpage.fourthDropdownItem(testData.linkedinLeads.location);
        await imprtfromcsvpage.fifthDropdownItem(testData.linkedinLeads.headline);
        await imprtfromcsvpage.sixthDropdownItem(testData.linkedinLeads.company);
        await imprtfromcsvpage.seventhDropdownItem(testData.linkedinLeads.about);
        await imprtfromcsvpage.eighthDropdownItem(testData.linkedinLeads.emailAddress);
        await imprtfromcsvpage.createEmptyList(testData.linkedinLeads.peopleImportedLeads);
        await imprtfromcsvpage.importLeadsButton().click({position:{x:7 ,y:20}});
        await expect(page.getByText('This field is required')).toBeVisible();
        await expect(page.getByText('Please map all required fields: LinkedIn Profile Url')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    // await expect(page.getByText('Please map all required fields: LinkedIn Profile Url, First Name, Last Name')).toBeVisible();

    test('Try to import leads without selecting First Name',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.firstDropdownItem(testData.linkedinLeads.profileUrl);
        //await imprtfromcsvpage.secondDropdownItem(testData.linkedinLeads.firstName);
        await imprtfromcsvpage.thirdDropdownItem(testData.linkedinLeads.lastName);
        await imprtfromcsvpage.fourthDropdownItem(testData.linkedinLeads.location);
        await imprtfromcsvpage.fifthDropdownItem(testData.linkedinLeads.headline);
        await imprtfromcsvpage.sixthDropdownItem(testData.linkedinLeads.company);
        await imprtfromcsvpage.seventhDropdownItem(testData.linkedinLeads.about);
        await imprtfromcsvpage.eighthDropdownItem(testData.linkedinLeads.emailAddress);
        await imprtfromcsvpage.createEmptyList(testData.linkedinLeads.peopleImportedLeads);
        await imprtfromcsvpage.importLeadsButton().click({position:{x:7 ,y:20}});
        await expect(page.getByText('This field is required')).toBeVisible();
        await expect(page.getByText('Please map all required fields: First Name')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    test('Try to import leads without selecting Last Name',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.firstDropdownItem(testData.linkedinLeads.profileUrl);
        await imprtfromcsvpage.secondDropdownItem(testData.linkedinLeads.firstName);
        //await imprtfromcsvpage.thirdDropdownItem('Last Name');
        await imprtfromcsvpage.fourthDropdownItem(testData.linkedinLeads.location);
        await imprtfromcsvpage.fifthDropdownItem(testData.linkedinLeads.headline);
        await imprtfromcsvpage.sixthDropdownItem(testData.linkedinLeads.company);
        await imprtfromcsvpage.seventhDropdownItem(testData.linkedinLeads.about);
        await imprtfromcsvpage.eighthDropdownItem(testData.linkedinLeads.emailAddress);
        await imprtfromcsvpage.createEmptyList(testData.linkedinLeads.peopleImportedLeads);
        await imprtfromcsvpage.importLeadsButton().click({position:{x:7 ,y:20}});
        await expect(page.getByText('This field is required')).toBeVisible();
        await expect(page.getByText('Please map all required fields: Last Name')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    test('Verify Add custom variable button visible or not',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.addCustomVariable()
        await expect(page.getByText('add custom variable')).toBeVisible();
        await expect(await imprtfromcsvpage.addCustomVariable()).toBeVisible();
        await expect(await imprtfromcsvpage.addCustomVariable()).toBeEnabled();
    })

    test('Check after click on add custom variable button should showing guide',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.addCustomVariable().click();
        //await expect(await imprtfromcsvpage.customVariableRow()).toHaveCount(1);
        await expect(page.getByText('Please select a column')).toBeVisible();
        await expect(page.getByText('Please enter a custom name')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    test('Check custom variable block showing after click on add custom variable',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.addCustomVariable().click();
        await expect(await imprtfromcsvpage.customVariableRow()).toHaveCount(1);
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
    test('Check custom variable block not showing after click on add custom variable delete button',async ({page})=>{
        await linkedinleads.addLeadsButton();
        await generateLeads.importFromCSV().click();
        await generateLeads.continueButton().click();
        await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
        await imprtfromcsvpage.addCustomVariable().click();
        await expect(await imprtfromcsvpage.customVariableRow()).toHaveCount(1);
        await imprtfromcsvpage.customVariableDeleteButton();
        await expect(await imprtfromcsvpage.customVariableRow()).toHaveCount(0);
    })
    // test('Verify Succssful People Lead Import from Import from CSV',async ({page})=>{
    //     await linkedinleads.addLeadsButton();
    //     await generateLeads.importFromCSV().click();
    //     await generateLeads.continueButton().click();
    //     await imprtfromcsvpage.uploadSpreadSheet().setInputFiles('UploadFiles\\seedlink leads.csv');
    //     await imprtfromcsvpage.firstDropdownItem('Profile URL');
    //     await imprtfromcsvpage.secondDropdownItem(testData.importFromCSV.firstName);
    //     await imprtfromcsvpage.thirdDropdownItem(testData.importFromCSV.lastName);
    //     await imprtfromcsvpage.fourthDropdownItem('Location');
    //     await imprtfromcsvpage.fifthDropdownItem(testData.importFromCSV.headline);
    //     await imprtfromcsvpage.sixthDropdownItem(testData.importFromCSV.company);
    //     await imprtfromcsvpage.seventhDropdownItem('About');
    //     await imprtfromcsvpage.eighthDropdownItem(testData.importFromCSV.emailAddress);
    //     await imprtfromcsvpage.createEmptyList(testData.importFromCSV.peopleImportedLeads);
    //     await imprtfromcsvpage.importLeadsButton().click();
    //     await expect(page.getByText('Success')).toBeVisible();
    //     // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    // })
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
        await imprtfromcsvpage.importLeadsButton().click({position:{x:7 ,y:20}});
        await expect(page.getByText('Success')).toBeVisible();
        // successfully import howar por leads importing validation kora hoy nai(Leads page e)
    })
})

//  npx playwright test tests/LeadsTests/ImportFromCSVTest.spec.js --project chromium --headed

// ei file fully ok 
