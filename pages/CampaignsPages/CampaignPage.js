import { ImprtFromCSVPage } from "../leadsPages/ImportFromCSVPage";
import { test, expect } from '@playwright/test';

export class CampaignPage {
    constructor(page) {
        this.page = page;
        this.importFromCSVPage = new ImprtFromCSVPage(page);
        this.campaignButtonLocator = '//a[@href="/campaigns"]';
        this.createCampaignLocator = '//button[normalize-space()="Create Campaign"]';
        this.EnterCampaignNameLocator = '//input[@placeholder="Enter campaign name"]';
        this.createButtonLocator = '//div[contains(text(),"Create")]';
        this.senderSelectionMarkLocator = '(//button[@value="on"])[1]';
        this.senderLimitConfigureButtonLocator = 'button:has(svg.lucide-settings)';
        this.senderLimitSaveButtonLocator = '//button[normalize-space()="Save Settings"]';
        this.senderScheduleButtonLocator = 'button:has(svg.lucide-clock)';
        this.updateScheduleButtonLocator = '//button[normalize-space()="Update Schedule"]';
        this.continueButtonLocator = '//button[normalize-space()="Continue"]';
        this.senderSceduleCrossButtonLocator = '//div[@class="flex justify-between items-center mb-4"]//*[name()="svg"]';
        this.selectLeadLeadsLocator = '//span[normalize-space()="Select leads"]';
        this.addActionButtonLocator = '(//button[normalize-space()="Add action"])[1]';
        this.ifOpenProfileLocator = '//span[normalize-space()="If Open Profile"]';
        this.launchCampaignLocator = '//button[normalize-space()="Launch Campaign"]';
        //this.mondaySliderLeftLocator = '(//div[@role="slider"])[1]';
        this.maxFollowsSlider = '(//span[@role="slider"])[1]'
        this.maxMessagesSlider = '(//span[@role="slider"])[2]'
        this.maxInMailDaySlider = '(//span[@role="slider"])[3]'
        this.maxConnectionRequestDaySlider = '(//span[@role="slider"])[4]'
        this.maxProfileViewDaySlider = '(//span[@role="slider"])[5]'
        this.maxPostLikeDaySlider = '(//span[@role="slider"])[6]'
    }

    async launchCampaign() {
        await this.page.locator(this.launchCampaignLocator).click();
    }
    async ifOpenProfile() {
        await this.page.locator(this.ifOpenProfileLocator).click();
    }
    async addActionButton() {
        await this.page.locator(this.addActionButtonLocator).click();
    }
    async selectLeadLeads(lead_list) {
        await this.importFromCSVPage.selectOptionByText(this.selectLeadLeadsLocator, lead_list);
    }
    async continueButton() {
        await this.page.locator(this.continueButtonLocator).click();
    }
    async senderSceduleCrossButton() {
        await this.page.locator(this.senderSceduleCrossButtonLocator).click();
    }
    // async updateScheduleButton() {
    //     await this.page.locator(this.updateScheduleButtonLocator).click();
    // }
    
async senderLimitSlider(sliderLocators) {
        const page = sliderLocator.page();
        const box = await sliderLocator.boundingBox();

        if (!box) {
            throw new Error("Slider box not found!"); // Error throw kora bhalo jate fail korle bujhte paren
        }
        
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX + 1000, startY, { steps: 10 }); 
        await page.mouse.up();
    }
    async senderScedule() {
        await this.page.locator(this.senderScheduleButtonLocator).click();

        for (let i = 1; i <= 7; i++) {

            let leftIndex = (i * 2) - 1;
            let rightIndex = i * 2;
            const leftSlider = this.page.locator(`(//div[@role='slider'])[${leftIndex}]`);
            const rightSlider = this.page.locator(`(//div[@role='slider'])[${rightIndex}]`);
            await leftSlider.scrollIntoViewIfNeeded();
            await rightSlider.scrollIntoViewIfNeeded()
            await this.moveSlider(leftSlider, rightSlider);
        }
        await this.page.locator(this.updateScheduleButtonLocator).click();
    }
    async moveSlider(leftSlider, rightSlider) {
        const actions = [
            { handle: leftSlider, offsetX: -1000 },
            { handle: rightSlider, offsetX: 1000 }
        ];

        for (const { handle, offsetX } of actions) {
            const page = handle.page();
            const box = await handle.boundingBox();

            if (!box) continue;

            const startX = box.x + box.width / 2;
            const startY = box.y + box.height / 2;

            await page.mouse.move(startX, startY);
            await page.mouse.down();

            await page.mouse.move(startX + offsetX, startY, { steps: 10 });

            await page.mouse.up();
        }
    }
    async senderLimitSaveButton() {
        await this.page.locator(this.senderLimitSaveButtonLocator).click();
    }

    async senderLimitConfigure() {
        await this.page.locator(this.senderLimitConfigureButtonLocator).click();
    }
    async selectSender() {
    await this.page.waitForTimeout(2000);
    return this.page.locator(this.senderSelectionMarkLocator);
}
    async campaignName(campaign_name) {
        await this.page.locator(this.EnterCampaignNameLocator).fill(campaign_name);
        await this.page.locator(this.createButtonLocator).click();
    }
    async createCampaign() {
        await this.page.locator(this.createCampaignLocator).click();
    }
    async campaignButton() {
        await this.page.locator(this.campaignButtonLocator).click();
    }
        async senderLimitSlider(SliderLocators) {
        const page = sliderLocator.page();
        const box = await sliderLocator.boundingBox();

        if (!box) return;
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX + 1000, startY, { steps: 10 });

        await page.mouse.up();
    }
    async adjustSenderLimit(sliderEvent){
        switch (sliderEvent) {
            case 'followsDay':
                await this.senderLimitSlider(this.maxFollowsSlider);
                break;
            case 'messageDay':
                await this.senderLimitSlider(this.maxMessagesSlider);
                break;
            case 'InMailDay':
                await this.senderLimitSlider(this.maxInMailDaySlider);
                break;
            case 'connectionRequestDay':
                await this.senderLimitSlider(this.maxConnectionRequestDaySlider);
                break;
            case 'profileViewDay':
                await this.senderLimitSlider(this.maxProfileViewDaySlider);
                break;
            case 'postLikeDay':
                await this.senderLimitSlider(this.maxPostLikeDaySlider);
                break;
            default:
                console.log(`Warning: Unrecognized sliderEvent '${sliderEvent}'`);
        }
    }

}