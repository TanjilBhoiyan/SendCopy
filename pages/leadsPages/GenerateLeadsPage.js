export class GenerateLeadsPage{

    constructor(page){
        this.page = page;
        this.continueButtonLocator = '//button[normalize-space()="Continue"]';
        this.linkedinRecruiterLocator='//span[normalize-space()="LinkedIn Recruiter"]';
        this.linkedinEventAttendeesLocator= '//span[normalize-space()="LinkedIn Event (Attendees)"]';
        this.linkedinPostReactorsLocator='(//span[normalize-space()="LinkedIn Post (Reactors)"])[1]';
        this.linkedinSearchCompaniesLocator='//span[normalize-space()="LinkedIn Search (Companies)"]';
        this.importFromCSVLocator='//span[normalize-space()="Import from CSV"]';
        this.salesNavigatorLeadsLocator='//span[normalize-space()="Sales Navigator (Leads)"]';
        this.SalesNavigatorAccountsLocator='//span[normalize-space()="Sales Navigator (Leads)"]';
    }
    importFromCSV(){
        return this.page.locator(this.importFromCSVLocator);
    }
    linkedinSearchCompanies(){
        return this.page.locator(this.linkedinSearchCompaniesLocator);
    }
    linkedinPostReactors(){
        return this.page.locator(this.linkedinPostReactorsLocator);
    }
    continueButton(){
        return this.page.locator(this.continueButtonLocator);
    }
    linkedinEventAttendees(){
        return this.page.locator(this.linkedinEventAttendeesLocator);
    }
}