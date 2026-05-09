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