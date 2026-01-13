export class LinkedinEventAttendeesPage{

    constructor(page){
        this.page = page ;
        this.listNameInputFieldLocator = '//input[@id="listName"]';
        this.selectSenderDropdownLocator = '(//button[@role="combobox"])[1]';
        this.senderNameOptionLocator= '//div[@role="option" and @data-slot="select-item"]';
        this.eventAttendeesUrlInputLocator = '//input[@id="searchUrl"]';
        this.startImportButtonLocator = 'button[type="submit"]';
    }

    async listNameInputField(list_name){
        await this.page.locator(this.listNameInputFieldLocator).fill(list_name);
    }
    async eventAttendeesUrlInput(eventattendees_url){
        await this.page.locator(this.eventAttendeesUrlInputLocator).fill(eventattendees_url);
        await this.page.waitForTimeout(2000);
    }
    startImportButton(){
        return this.page.locator(this.startImportButtonLocator);
    }
    async selectSenderName(sender_name){
        await this.page.locator(this.selectSenderDropdownLocator).click();
        await this.page.waitForTimeout(2000);

        const options = await this.page.$$(this.senderNameOptionLocator);
        for(let option of options){
            const senderName = await option.textContent();
            if(senderName.includes(sender_name)){
                await option.click();
                break;
            }
        }
    }
}