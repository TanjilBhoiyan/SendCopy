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
        this.UpdatePlanButtonLocator='//button[normalize-space()="Upgrade Plan"]';
        this.ContinueButtonLocator='//button[normalize-space()="Continue"]';
    }
    async updatePlan(){
        await this.page.locator(this.UpdatePlanButtonLocator).click();
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