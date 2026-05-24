export class SettingsPage{
    constructor(page){
        this.page = page;
        this.settingsButtonLocator='.lucide.lucide-settings';
        this.ProfileSettingsButtonLocator='a[href="/settings/profile"]';
        this.BillingLocator='a[href="/settings/billing"]';
        this.CommunityLocator='a[target="_blank"]';
        this.WatchGuidelineLocator='a[href="/dashboard?watch-tutorial"]';
        this.LogoutButtonLocator='//aside//button[span="Log out"]';
        this.SkipForNowButtonLocator='//button[normalize-space()="Skip for now"]';
        this.UpdatePlanButtonLocator='body > div:nth-child(11) > main:nth-child(2) > div:nth-child(2) > section:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(2)';
        this.ContinueButtonLocator='//button[normalize-space()="Continue"]';
    }
    async ContinueButton(){
        await this.page.locator(this.ContinueButtonLocator).click();
    }
    async updatePlan(){
        await this.page.getByRole('button', { name: 'Choose Plan' }).nth(2).click();
    }
    async billingButton(){
        await this.page.locator(this.BillingLocator).click();
    }
    async communityButton(){
        await this.page.locator(this.CommunityLocator).click();
    }
    async settingsButton(){
        await this.page.locator(this.settingsButtonLocator).click();
    }
    async LogOutButton(){
        await this.page.locator(this.LogoutButtonLocator).click();
    }
    async WatchGuidline(){
        await this.page.locator(this.WatchGuidelineLocator).click();
        await this.page.locator(this.SkipForNowButtonLocator).click();
    }
}