export class NetworkPage {
    constructor(page) {
        this.page = page;
        this.networkButtonLocator = '//a[@href="/network"]';
        //this.headlineLocator='span[data-slot="tooltip-trigger"]';
        this.leadsRowLocator = '//tbody//tr';
        this.headlineLocator = 'tbody>tr:first-child>td:nth-child(2)>span';
        //this.headlineTooltipLocator='body>div:nth-child(13)>div:nth-child(1)>p';
        this.headlineTooltipLocator = 'div[class="bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance"]';
        this.selectModeSwitchLocator = '//button[@role="switch"]';
        this.leadNameCheckBoxLocator = '//button[@aria-label="Select all"]';
        this.clearSelectionButtonLocator = '//button[normalize-space()="Clear selections"]';
        this.addToListButtonLocator = '//button[normalize-space()="Add to list"]';
        this.newListPopUpLocator = '//div[@role="dialog"]';
        this.searchByKeywordLocator = '//input[@placeholder="Search by keywords"]';
        this.listNameInputBoxLocator = '//input[@placeholder="Enter lead name"]';
        this.ListNameConfirmButtonLocator = '//div[contains(text(),"Confirm")]';
    }
    listNameConfirmButton() {
        return this.page.locator(this.ListNameConfirmButtonLocator);
    }
    async listNameInputBox(newListName) {
        await this.page.locator(this.listNameInputBoxLocator).fill(newListName);
    }
    async searchByKeyword(leads_name) {
        await this.page.locator(this.searchByKeywordLocator).fill(leads_name);
        const SearchLeadName = await this.page.locator(this.leadsRowLocator).innerText();
        console.log(SearchLeadName);
        return SearchLeadName;
    }
    newListPopUp() {
        return this.page.locator(this.newListPopUpLocator);
    }
    addToListButton() {
        return this.page.locator(this.addToListButtonLocator);
    }
    clearSelectionButton() {

        return this.page.locator(this.clearSelectionButtonLocator);
    }
    leadNameCheckBox() {
        //await this.page.locator(this.leadNameCheckBoxLocator).waitFor({state: 'visible'});
        return this.page.locator(this.leadNameCheckBoxLocator);
    }
    async selectModeSwitch() {
        await this.page.locator('table tbody tr:first-child td:nth-child(2) span').waitFor({ state: 'visible' });
        await this.page.locator(this.selectModeSwitchLocator).click();
    }
    headlineTooltip() {
        return this.page.locator(this.headlineTooltipLocator);
    }
    headline() {
        return this.page.locator(this.headlineLocator);
    }
    async networkButton() {
        await this.page.locator(this.networkButtonLocator).click();
    }
}