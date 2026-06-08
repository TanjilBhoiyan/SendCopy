export class CampaignPage{
    constructor(page){
        this.page = page;
        this.campaignButtonLocator='//a[@href="/campaigns"]';
        this.createCampaignLocator='//button[normalize-space()="Create Campaign"]';
        this.EnterCampaignNameLocator='//input[@placeholder="Enter campaign name"]';
        this.createButtonLocator='//div[contains(text(),"Create")]';
        this.senderSelectionMarkLocator='(//button[@value="on"])[1]';
        this.senderLimitConfigureButtonLocator='button:has(svg.lucide-settings)';
        this.senderLimitSaveButtonLocator='//button[normalize-space()="Save Settings"]';
        this.senderScheduleButtonLocator='button:has(svg.lucide-clock)';
        this.updateScheduleButtonLocator='//button[normalize-space()="Update Schedule"]';
        this.continueButtonLocator='//button[normalize-space()="Continue"]';
        this.senderSceduleCrossButtonLocator='//div[@class="flex justify-between items-center mb-4"]//*[name()="svg"]';
    }
    async continueButton(){
        await this.page.locator(this.continueButtonLocator).click();
    }
    async senderSceduleCrossButton(){
        await this.page.locator(this.senderSceduleCrossButtonLocator).click();
    }
    async updateScheduleButton(){
        await this.page.locator(this.updateScheduleButtonLocator).click();
    }
    async senderScedule(){
        await this.page.locator(this.senderScheduleButtonLocator).click();
    }
    async senderLimitSaveButton(){
        await this.page.locator(this.senderLimitSaveButtonLocator).click();
    }
    async senderLimitConfigure(){
        await this.page.locator(this.senderLimitConfigureButtonLocator).click();
    }
    async selectSender(){
        await this.page.locator(this.senderSelectionMarkLocator).click()
    }
    async campaignName(campaign_name){
        await this.page.locator(this.EnterCampaignNameLocator).fill(campaign_name);
        await this.page.locator(this.createButtonLocator).click();
    }
    async createCampaign(){
        await this.page.locator(this.createCampaignLocator).click();
    }
    async campaignButton(){
        await this.page.locator(this.campaignButtonLocator).click();
    }
    
}