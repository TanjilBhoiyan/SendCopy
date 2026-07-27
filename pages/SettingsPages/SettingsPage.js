export class SettingsPage {
    constructor(page) {
        this.page = page;
        this.settingsButtonLocator = '.lucide.lucide-settings';
        this.ProfileSettingsButtonLocator = 'a[href="/settings/profile"]';
        this.BillingLocator = 'a[href="/settings/billing"]';
        this.CommunityLocator = 'a[target="_blank"]';
        this.WatchGuidelineLocator = 'a[href="/dashboard?watch-tutorial"]';
        this.LogoutButtonLocator = '//aside//button[span="Log out"]';
        this.SkipForNowButtonLocator = '//button[normalize-space()="Skip for now"]';
        this.UpdatePlanButtonLocator = 'body > div:nth-child(11) > main:nth-child(2) > div:nth-child(2) > section:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(2)';
        this.ContinueButtonLocator = '//button[normalize-space()="Continue"]';
        this.InvoicesLocator = '(//button[normalize-space()="Invoices"])[1]';
        this.areaExpandedButtonLocator = '(//button[@type="button"])[8]';
        this.viewButtonLocator = '//span[normalize-space()="View"]';
        this.downloadButtonLocator = '//span[normalize-space()="Download"]';
        this.choosePlanGrowthLocator = '//body//div//div[@role="tabpanel"]//div//div[1]//div[1]//button[1]';
        this.cardNumber = '#cardNumber';
    }
    async paymentMethod() {
        const checkoutFrame = this.page.frameLocator('iframe[name="embedded-checkout"]');

        await checkoutFrame.locator('#cardNumber').fill('4242424242424242');
        await checkoutFrame.locator('#cardExpiry').fill('12/34');
        await checkoutFrame.locator('#cardCvc').fill('123');
        // Cardholder name
        await checkoutFrame.locator('input[placeholder="Full name on card"]').fill('Tanjil Bhuiyan');
        // Submit / Subscribe button
        await checkoutFrame.getByRole('button', { name: 'Subscribe' }).click();
    }
    async choosePlanGrowth() {
        await this.page.locator(this.choosePlanGrowthLocator).click();
    }
    async downloadButton() {
        await this.page.locator(this.downloadButtonLocator).click();
    }
    async viewButton() {
        await this.page.locator(this.viewButtonLocator).click();
    }
    async threeDotButton() {
        await this.page.locator(this.areaExpandedButtonLocator).click();
    }
    async invoice() {
        await this.page.locator(this.InvoicesLocator).click();
    }
    async ContinueButton() {
        await this.page.locator(this.ContinueButtonLocator).click();
    }
    async updatePlan() {
        await this.page.getByRole('button', { name: 'Choose Plan' }).nth(2).click();
    }
    async billingButton() {
        await this.page.locator(this.BillingLocator).click();
    }
    async communityButton() {
        await this.page.locator(this.CommunityLocator).click();
    }
    async settingsButton() {
        await this.page.locator(this.settingsButtonLocator).click();
    }
    async LogOutButton() {
        await this.page.locator(this.LogoutButtonLocator).click();
    }
    async WatchGuidline() {
        await this.page.locator(this.WatchGuidelineLocator).click();
        await this.page.locator(this.SkipForNowButtonLocator).click();
    }
}