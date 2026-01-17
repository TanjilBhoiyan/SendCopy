export class CampaignPage{
    constructor(page){
        this.page = page;
        this.campaignButtonLocator='//a[@href="/campaigns"]';
        
    }
    async campaignButton(){
        await this.page.locator(this.campaignButtonLocator).click();
    }
    
}