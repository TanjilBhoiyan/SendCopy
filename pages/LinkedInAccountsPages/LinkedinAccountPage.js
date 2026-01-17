import { ImprtFromCSVPage } from "../leadsPages/ImportFromCSVPage";

export class LinkedinAccountPage{
    constructor(page){
        this.page = page;
        this.importFromCSVPage = new ImprtFromCSVPage(page);
        this.linkedinButtonLocator='//a[@href="/linkedin"]';
        this.purchaseSeatsButtonLocator='//button[normalize-space()="Purchase seats"]';
        this.connectAccountLocator='//button[normalize-space()="Connect account"]';
        this.connectAccountModalLocator='div[role="dialog"]';
        this.linkedinEmailAddressInputLocator='input[data-slot="form-control"]';
        this.linkedinPasswordInputLocator='input[data-slot="input"]';
        this.privacyConfigurationLocator='//span[normalize-space()="Choose your inbox privacy configuration"]';
        this.selectCountryLocator='//span[normalize-space()="Choose your country"]';
        this.connectAccountButtonLocator='//button[normalize-space()="Connect Account"]';
        this.connectCookiesButtonLocator='//button[normalize-space()="Connect using cookies"]';
        this.nextStepButtonLocator='//button[normalize-space()="Next Step"]';
        this.liatValueInputLocator='textarea[placeholder="Paste your LIAT value here..."]';
        //this.connectAccountButtonLocator='//button[normalize-space()="Connect Account"]'
        this.previousButtonLocator='//button[normalize-space()="Previous"]';
    }
    async previousButton(){
        await this.page.locator(this.previousButtonLocator).click();
    }
    async liatValueInput(LIAT){
        await this.page.locator(this.liatValueInputLocator).fill(LIAT);
    }
    async nextStepButton(){
        await this.page.locator(this.nextStepButtonLocator).click();
    }
    async connectCookiesButton(){
        await this.page.locator(this.connectCookiesButtonLocator).click();
    }
    connectAccount(){
        return this.page.locator(this.connectAccountButtonLocator);
    }
    async selectCountry(country){
        await this.importFromCSVPage.selectOptionByText(this.selectCountryLocator, country);
    }
    async inboxPrivacyConfiguration(text){
        await this.importFromCSVPage.selectOptionByText(this.privacyConfigurationLocator , text );
    }
    async linkedinPasswordInput(password){
        await this.page.locator(this.linkedinPasswordInputLocator).fill(password);
    }
    async linkedinEmailAddressInput(email){
        await this.page.locator(this.linkedinEmailAddressInputLocator).fill(email);
    }
    connectAccountButton(){
        return this.page.locator(this.connectAccountLocator);
    }
    async linkedinAccountButton(){
        await this.page.locator(this.linkedinButtonLocator).click();
    }
    connectAccountModal(){
        return this.page.locator(this.connectAccountModalLocator);
    }
    purchaseSeatsButton(){
        return this.page.locator(this.purchaseSeatsButtonLocator);
    }
}