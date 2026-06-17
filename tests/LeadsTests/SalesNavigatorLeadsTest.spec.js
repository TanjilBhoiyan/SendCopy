import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LinkedinLeadsPage } from '../../pages/leadsPages/LinkedinLeadsPage';
import { GenerateLeadsPage } from '../../pages/leadsPages/GenerateLeadsPage';
import { LinkedInSearchBarPage } from '../../pages/leadsPages/LinkedInSearchBarPage';
import { LinkedinEventAttendeesPage} from '../../pages/leadsPages/LinkedInEventAttendeesPage';
import { LinkedinSearchCompanies } from '../../pages/leadsPages/LinkedInSearchCompaniesPage';
import { ImprtFromCSVPage } from '../../pages/leadsPages/ImportFromCSVPage';

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
        await login.login(testData.loginTestData.validEmail,testData.loginTestData.validPassword);
        linkedinleads = new LinkedinLeadsPage(page);
        await linkedinleads.linkedinLeadsLink();


        // create object for generate leads page
        generateLeads = new GenerateLeadsPage(page);
        linkedinsearchbar = new LinkedInSearchBarPage(page);
        linkedineventattendees = new LinkedinEventAttendeesPage(page);
        linkedinsearchcompanies = new LinkedinSearchCompanies(page);
        imprtfromcsvpage = new ImprtFromCSVPage(page);
    })
})