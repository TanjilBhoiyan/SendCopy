export class AnalyticsPage{
    constructor(page){
        this.page = page;
        this.analyticsButtonLocator='//a[@href="/analytics"]';
    }
    async analyticsButton(){
        await this.page.locator(this.analyticsButtonLocator).click();
    }
}