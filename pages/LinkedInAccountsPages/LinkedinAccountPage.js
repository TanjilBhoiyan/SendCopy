export class LinkedinAccountPage{
    constructor(page){
        this.page = page;
        this.linkedinButtonLocator='//a[@href="/linkedin"]';
    }
    async linkedinAccountButton(){
        await this.page.locator(this.linkedinButtonLocator).click();
    }
}