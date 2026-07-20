import { ImprtFromCSVPage } from "../leadsPages/ImportFromCSVPage";

import { test, expect } from '@playwright/test';
export class LinkedinAccountPage {
    constructor(page) {
        this.page = page;
        this.importFromCSVPage = new ImprtFromCSVPage(page);
        this.linkedinButtonLocator = '//a[@href="/linkedin"]';
        this.purchaseSeatsButtonLocator = '//button[normalize-space()="Purchase seats"]';
        this.connectAccountLocator = '//button[normalize-space()="Connect account"]';
        this.connectAccountModalLocator = 'div[role="dialog"]';
        this.linkedinEmailAddressInputLocator = 'input[data-slot="form-control"]';
        this.linkedinPasswordInputLocator = 'input[data-slot="input"]';
        this.privacyConfigurationLocator = '//span[normalize-space()="Choose your inbox privacy configuration"]';
        this.selectCountryLocator = '//span[normalize-space()="Choose your country"]';
        this.connectAccountButtonLocator = '//button[normalize-space()="Connect Account"]';
        this.connectCookiesButtonLocator = '//button[normalize-space()="Connect using cookies"]';
        this.nextStepButtonLocator = '//button[normalize-space()="Next Step"]';
        this.liatValueInputLocator = 'textarea[placeholder="Paste your LIAT value here..."]';
        this.previousButtonLocator = '//button[normalize-space()="Previous"]';
        this.verifyYourProxyDivLocator = '//div[@class="space-y-2"]';
        this.configureLimitButtonLocator = '(//button[normalize-space()="Configure limits"])[1]';
        this.updateSettingsButtonLocator = '//button[normalize-space()="Update Settings"]';

        this.maxFollowDaySliderLocator = '#max-follows-day'
        this.maxFollowDayValueLocator = '(//div[@class="bg-white rounded-md px-2 py-1 border border-gray-200 text-slate-700 text-center min-w-12"][normalize-space()="40"])[1]';

        this.maxMessageDaySliderLocator = '#max-msg-day';
        this.maxMessageDayValueLocator = '//body[1]/div[4]/div[3]/form[1]/div[3]/div[1]/div[1]/div[1]';
        this.maxInmailMessageDaySliderLocator = '#max-in-mail-msg-day'
        this.maxInmailMessageDayValueLocator = '//body[1]/div[4]/div[3]/form[1]/div[4]/div[1]/div[1]/div[1]'
        this.maxConnectionRequestDaySliderLocator = '#max-connection-requests-day';
        this.maxConnectionRequestDayValueLocator = '(//span[@role="slider"])[6]';
        this.maxProfileViewDaySliderLocator = '#max-profile-views-day';
        this.maxProfileViewDayValueLocator = '//body[1]/div[4]/div[3]/form[1]/div[6]/div[1]/div[1]/div[1]';

        this.maxPostLikesDaySliderLocator = '#max-like-posts-per-day';
        this.maxPostLikesDayValueLocator = '//div[contains(text(),"36")]';


        this.accountThreeDotLocator = '(//button[@type="button"])[3]'
        this.configureProxyButtonLocator = '//span[normalize-space()="Configure proxy"]';
        this.removeAccountButtonLocator = '//span[normalize-space()="Remove account"]';
        this.reconnectButtonLocator = '//span[normalize-space()="Reconnect"]';
        this.configureSendingLimitButtonLocator = '//span[normalize-space()="Configure sending limits"]';
        this.inboxPrivacyConfigurationLocator = '//span[normalize-space()="Inbox privacy configuration"]';
        this.verificationRequiredLocator = '.text-red-600.font-medium.text-xs.whitespace-nowrap';
        this.verifyYourProxySectionLocator = '//div[@class="space-y-2"]';
        this.removeAccountRedButtonLocator = '//button[normalize-space()="Remove account"]';
        //
        this.allStatusLocator = '//tr[@data-slot="table-row"]//div[contains(@class,"min-w-32")]//span';
        this.allConnectedAccountsLocator = '//tbody[@data-slot="table-body"]//tr[@data-slot="table-row"]'
        this.linkedinConversationLocator = '//label[normalize-space()="Track and import all LinkedIn conversations"]';
        this.sendcopyConversationLocator = '//label[normalize-space()="Track only conversations started from SendCopy"]'
        this.setPrivacyButtonLocator = '//button[normalize-space()="Set Privacy"]';
        this.statusFilterDropdownLocator = '.lucide.lucide-chevron-down.size-4.opacity-50';
        this.connectedStatusFilterLocator = '//span[@class="truncate"][normalize-space()="Connected"]';
        this.notconnectedStatusFilterLocator = '//span[@class="truncate"][normalize-space()="Not Connected"]'
        this.inCampaignStatusLocator = '//span[@class="truncate"][normalize-space()="In Campaign"]';
        this.inActiveStatusLocator = '//span[@class="truncate"][normalize-space()="Inactive"]';

    }
    async statusFilterDropdown() {
        await this.page.locator(this.statusFilterDropdownLocator).click();
    }
    async choosePrivacyMode(conversation) {
        if (conversation === 'Track and import all LinkedIn conversations') {
            await this.page.locator(this.linkedinConversationLocator).click();
            await this.page.locator(this.setPrivacyButtonLocator).click();
        }
        else if (conversation === 'Track only conversations started from SendCopy') {
            await this.page.locator(this.sendcopyConversationLocator).click();
            await this.page.locator(this.setPrivacyButtonLocator).click();
        }
    }
    async inActiveStatus(status) {
        await this.importFromCSVPage.selectOptionByText(this.inActiveStatusLocator, status);
    }
    async inCampaignStatus(status) {
        await this.importFromCSVPage.selectOptionByText(this.inCampaignStatusLocator, status);
    }
    async notConnectedStatus(status) {
        await this.importFromCSVPage.selectOptionByText(this.notconnectedStatusFilterLocator, status);
    }
    async connectedStatus(status) {
        await this.importFromCSVPage.selectOptionByText(this.connectedStatusFilterLocator, status);
    }
    async accountFilter(status) {
        const rows = this.page.locator(this.allConnectedAccountsLocator);
        const rowCount = await rows.count();
        console.log(rowCount);
        if (rowCount < 1) {
            //await expect(this.page.getByText('No accounts found')).toBeVisible();
            return 'No accounts found';
        }
        else {
            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const statusText = await currentRow.innerText();
                if (!statusText.includes(status)) {
                    return false;
                }
            }
            return true;
        }
    };
    async getLinkedinAccountStatus(status) {
        await this.page.waitForLoadState('networkidle');
        const rows = this.page.locator(this.allConnectedAccountsLocator);
        const rowCount = await rows.count();
        console.log(rowCount);

        for (let i = 0; i < rowCount; i++) {
            const currentRow = rows.nth(i);
            const statusText = await currentRow.innerText();

            if (statusText.includes(status)) {
                return currentRow;
                //break;
            }
        }
        return null;
    };
    // connected or verificator requred 
    // async isConnected(){
    //     const rows = this.page.locator(this.allConnectedAccountsLocator);
    //     const rowCount = await rows.count();
    //     console.log(rowCount);

    //     for(let i=0;i<rowCount;i++){

    //         const currentRow = rows.nth(i);
    //         const statusText = await currentRow.innerText();

    //         if(statusText.includes('Connected')){
    //             await currentRow.locator('button').last().click();
    //             break;
    //         }
    //     }
    //     console.log('User has no connected linkedin account');
    // }
    InboXPrivacyConfiguration() {
        //await this.page.locator(this.inboxPrivacyConfigurationLocator).waitFor({ state: 'visible' });
        return this.page.locator(this.inboxPrivacyConfigurationLocator);
    }
    removeAccountRedButton() {
        return this.page.locator(this.removeAccountRedButtonLocator);
    }
    async removeAccountButton() {
        return this.page.locator(this.removeAccountButtonLocator).click();
    }
    configureProxyButton() {
        //failed hoile wait add kora lage 
        return this.page.locator(this.configureProxyButtonLocator);
    }
    verifyYourProxySection() {
        return this.page.locator(this.verifyYourProxySectionLocator);
    }
    threeDotButton() {
        return this.page.locator(this.accountThreeDotLocator);
    }
    verificationRequired() {
        return this.page.locator(this.verificationRequiredLocator);
    }
    async maxPostLikesDay(set_value) {
        await this.sliderMove(this.maxPostLikesDaySliderLocator, this.maxPostLikesDayValueLocator, set_value);
    }
    async maxProfileViewsDay(set_value) {
        await this.sliderMove(this.maxProfileViewDaySliderLocator, this.maxProfileViewDayValueLocator, set_value);
    }
    async maxConnectionRequestDay(set_value) {
        await this.sliderMove(this.maxConnectionRequestDaySliderLocator, this.maxConnectionRequestDayValueLocator, set_value);
    }
    async inMailMessageDay(set_value) {
        await this.sliderMove(this.maxInmailMessageDaySliderLocator, this.maxInmailMessageDayValueLocator, set_value);
    }
    async maxMessageDay(set_value) {
        await this.sliderMove(this.maxMessageDaySliderLocator, this.maxMessageDayValueLocator, set_value);
    }
    async maxFollowDay(set_value) {
        await this.sliderMove(this.maxFollowDaySliderLocator, this.maxFollowDayValueLocator, set_value);
    }

    async sliderMove(slider_bar, slider_value, set_value) {
        await this.page.waitForSelector(slider_bar);

        const sliderHandle = await this.page.$(slider_bar);
        const valueDisplay = this.page.locator(slider_value);

        console.log(valueDisplay);
        let targetAmount = set_value; // target value

        if (sliderHandle) {
            const srcBound = await sliderHandle.boundingBox();
            if (srcBound) {
                // finding the current value
                let currentText = await valueDisplay.inputValue().catch(() => null);
                console.log(currentText);
                if (!currentText) {
                    currentText = await valueDisplay.textContent();
                }
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

    updateSettingsButton() {
        return this.page.locator(this.updateSettingsButtonLocator);
    }
    async configureLimitButton() {
        await this.page.locator(this.configureLimitButtonLocator).click();
    }
    verifyYourProxyDiv() {
        return this.page.locator(this.verifyYourProxyDivLocator);
    }
    async previousButton() {
        await this.page.locator(this.previousButtonLocator).click();
    }
    async liatValueInput(LIAT) {
        //await this.page.locator(this.liatValueInputLocator).fill(LIAT);
        await this.page.getByPlaceholder('Paste your "li_at" value here...').fill(LIAT);
    }
    async nextStepButton() {
        await this.page.locator(this.nextStepButtonLocator).click();
    }
    async connectCookiesButton() {
        await this.page.locator(this.connectCookiesButtonLocator).click();
    }
    connectAccount() {
        return this.page.locator(this.connectAccountButtonLocator);
    }

    async selectCountry(country) {
        await this.importFromCSVPage.selectOptionByText(this.selectCountryLocator, country);
    }

    async inboxPrivacyConfiguration(text) {
        await this.importFromCSVPage.selectOptionByText(this.privacyConfigurationLocator, text);
    }
    async linkedinPasswordInput(password) {
        await this.page.locator(this.linkedinPasswordInputLocator).fill(password);
    }
    async linkedinEmailAddressInput(email) {
        await this.page.locator(this.linkedinEmailAddressInputLocator).fill(email);
    }
    connectAccountButton() {
        return this.page.locator(this.connectAccountLocator);
    }
    async linkedinAccountButton() {
        await this.page.locator(this.linkedinButtonLocator).click();
    }
    connectAccountModal() {
        return this.page.locator(this.connectAccountModalLocator);
    }
    purchaseSeatsButton() {
        return this.page.locator(this.purchaseSeatsButtonLocator);
    }
}