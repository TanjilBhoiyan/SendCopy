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
        this.previousButtonLocator='//button[normalize-space()="Previous"]';
        this.verifyYourProxyDivLocator='//div[@class="space-y-2"]';
        this.configureLimitButtonLocator='(//button[normalize-space()="Configure limits"])[1]';
        this.updateSettingsButtonLocator='//button[normalize-space()="Update Settings"]';
        this.maxFollowDaySliderLocator='#max-follows-day'
        this.maxFollowDayValueLocator='//body[1]/div[4]/div[3]/form[1]/div[2]/div[1]/div[1]/div[1]';
        this.maxMessageDaySliderLocator='#max-msg-day';
        this.maxMessageDayValueLocator='//body[1]/div[4]/div[3]/form[1]/div[3]/div[1]/div[1]/div[1]';
        this.maxInmailMessageDaySliderLocator='#max-in-mail-msg-day'
        this.maxInmailMessageDayValueLocator='//body[1]/div[4]/div[3]/form[1]/div[4]/div[1]/div[1]/div[1]'
        this.maxConnectionRequestDaySliderLocator='#max-connection-requests-day';
        this.maxConnectionRequestDayValueLocator='//body[1]/div[4]/div[3]/form[1]/div[5]/div[1]/div[1]/div[1]';
        this.maxProfileViewDaySliderLocator='#max-profile-views-day';
        this.maxProfileViewDayValueLocator='//body[1]/div[4]/div[3]/form[1]/div[6]/div[1]/div[1]/div[1]';
        this.maxPostLikesDaySliderLocator='#max-like-posts-per-day';
        this.maxPostLikesDayValueLocator='//body[1]/div[4]/div[3]/form[1]/div[7]/div[1]/div[1]/div[1]';
    }
    async maxPostLikesDay(set_value){
        await this.sliderMove(this.maxPostLikesDaySliderLocator, this.maxConnectionRequestDayValueLocator,set_value);
    }
    async maxProfileViewsDay(set_value){
        await this.sliderMove(this.maxProfileViewDaySliderLocator, this.maxConnectionRequestDayValueLocator,set_value);
    }
    async maxConnectionRequestDay(set_value){
        await this.sliderMove(this.maxConnectionRequestDaySliderLocator, this.maxConnectionRequestDayValueLocator,set_value);
    }
    async inMailMessageDay(set_value){
        await this.sliderMove(this.maxInmailMessageDaySliderLocator, this.maxInmailMessageDayValueLocator,set_value);
    }
    async maxMessageDay(set_value){
        await this.sliderMove(this.maxMessageDaySliderLocator, this.maxConnectionRequestDayValueLocator,set_value);
    }
    async maxFollowDay(set_value){
        await this.sliderMove(this.maxFollowDaySliderLocator,this.maxFollowDayValueLocator,set_value);
    }

    async sliderMove(slider_bar,slider_value,set_value){
        await this.page.waitForSelector(slider_bar);
        
        const sliderHandle = await this.page.$(slider_bar);
        const valueDisplay = this.page.locator(slider_value);

        let targetAmount = set_value; // target value
        
        if (sliderHandle) {
            const srcBound = await sliderHandle.boundingBox();
            if (srcBound) {
                // finding the current value
                let currentText = await valueDisplay.textContent();
                let currentValue = parseInt(currentText.trim());
                console.log('Starting from: ' + currentValue);

                // slider er current position 
                let startX = srcBound.x + (srcBound.width * (currentValue / 100));
                let currentY = srcBound.y + srcBound.height / 2;

                await this.page.mouse.move(startX, currentY);
                await this.page.mouse.down();

                let isCompleted = false;
                let moveX = startX;

                while (!isCompleted) {
                    // if current value less than target value then move right 
                    if (currentValue < targetAmount) {
                        moveX += 2;
                    } 
                    // if current value already equal or grater target value
                    else {
                        isCompleted = true;
                        break;
                    }
                    await this.page.mouse.move(moveX, currentY);
                    // check the new updated value
                    let updatedText = await valueDisplay.textContent();
                    currentValue = parseInt(updatedText.trim());

                    if (currentValue >= targetAmount) {
                        isCompleted = true;
                    }
                }
                await this.page.mouse.up();
                console.log('Final Value Reached: ' + currentValue);
            }
        }
    }

    updateSettingsButton(){
        return this.page.locator(this.updateSettingsButtonLocator);
    }
    async configureLimitButton(){
        await this.page.locator(this.configureLimitButtonLocator).click();
    }
    verifyYourProxyDiv(){
        return this.page.locator(this.verifyYourProxyDivLocator);
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