export class NetworkPage{
    constructor(page){
        this.page = page;
        this.networkButtonLocator='//a[@href="/network"]';
    }
    async networkButton(){
        await this.page.locator(this.networkButtonLocator).click();
    }
}