export class LinkedInSearchBarPage{
    constructor(page){
        this.page = page;

        this.listNameInputFieldLocator = '//input[@id="listName"]';
        this.selectSenderDropdownLocator = '(//button[@role="combobox"])[1]';
        this.senderNameOptionLocator= '//div[@role="option" and @data-slot="select-item"]';
        this.searchUrlInputLocator = '//input[@id="searchUrl"]';
        this.startImportButtonLocator = 'button[type="submit"]';
    }

    async listNameInputField(list_name){
        await this.page.locator(this.listNameInputFieldLocator).fill(list_name);
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
    async searchUrlInput(search_url){
        await this.page.locator(this.searchUrlInputLocator).fill(search_url);
        await this.page.waitForTimeout(2000);
    }
    startImportButton(){
        return this.page.locator(this.startImportButtonLocator);
    }
}


//    await page.getByRole('combobox').filter({ hasText: 'Select senders' }).click();
//    await page.locator('#radix-_r_2u_').getByText('Shakil Bhuiyan').click();