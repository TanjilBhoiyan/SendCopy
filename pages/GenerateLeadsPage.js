export class GenerateLeadsPage{

    constructor(page){
        this.page = page;
        this.continueButtonLocator = '//button[normalize-space()="Continue"]';
        this.linkedinRecruiterLocator='//span[normalize-space()="LinkedIn Recruiter"]';
        this.linkedinEventAttendeesLocator= '//span[normalize-space()="LinkedIn Event (Attendees)"]';
        this.linkedinPostReactorsLocator='(//span[normalize-space()="LinkedIn Post (Reactors)"])[1]';
        this.linkedinSearchCompaniesLocator='//span[normalize-space()="LinkedIn Search (Companies)"]';
        this.importCSVLocator='//span[normalize-space()="Import from CSV"]';
        this.salesNavigatorLeadsLocator='//span[normalize-space()="Sales Navigator (Leads)"]';
        this.SalesNavigatorAccountsLocator='//span[normalize-space()="Sales Navigator (Leads)"]';
    }
    linkedinpostreactors(){
        return this.page.locator(this.linkedinPostReactorsLocator);
    }
    continuebutton(){
        return this.page.locator(this.continueButtonLocator);
    }
    linkedineventattendees(){
        return this.page.locator(this.linkedinEventAttendeesLocator);
    }
}