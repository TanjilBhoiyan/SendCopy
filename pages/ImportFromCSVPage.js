export class ImprtFromCSVPage{
    constructor(page){
        this.page = page;
        this.uploadSpreadSheetLocator = 'input[type="file"]';
        this.profileUrlLocator='(//button[@role="combobox"])[1]';
        this.OptionsLocator='div[data-slot="select-item"]';
        this.firstNameLocator='(//button[@role="combobox"])[2]';
        this.lastNameLocator='(//button[@role="combobox"])[3]';
        this.locationLocator='(//button[@role="combobox"])[4]';
        this.headlineLocator='(//button[@role="combobox"])[5]';
        this.companyNameLocator='(//button[@role="combobox"])[6]';
        this.aboutLocator='(//button[@role="combobox"])[7]';
        this.emailaddressLocator='(//button[@role="combobox"])[8]';
        this.customVariableButtonLocator='//button[normalize-space()="Add custom variable"]';
        this.selectleadlistLocator='#radix-_r_9_-content-people > div > div.space-y-6 > div.space-y-6 > div.grid.grid-cols-12.md\:gap-4.gap-2.items-end > div.space-y-1.md\:col-span-8.col-span-12 > button';
        this.createEmptylistLocator='//button[normalize-space()="Create empty list"]';
        this.importLeadsButtonLocator='//button[normalize-space()="Import Leads"]';
        this.listNameInputLocator='//input[@placeholder="Enter list name"]';
        this.confirmButtonLocator = '//div[contains(text(),"Confirm")]';
    }
    importleadsbutton(){
        return this.page.locator(this.importLeadsButtonLocator);
    }
    async createemptylist(list_name){
        await this.page.locator(this.createEmptylistLocator).click();
        await this.page.locator(this.listNameInputLocator).fill(list_name);
        await this.page.locator(this.confirmButtonLocator).click();
    }

    async selectOptionByText(selector , searchText){
        await this.page.locator(selector).click();
        await this.page.waitForTimeout(2000);
        const options = await this.page.$$(this.OptionsLocator);
        for(let option of options){
            const text = await option.textContent();
            if(text.includes(searchText)){
                await option.click();
                break;
            }
        }
    }

    async emailaddress(email_address){
        await this.selectOptionByText(this.emailaddressLocator,email_address);
    }
    async about(about){
        await this.selectOptionByText(this.aboutLocator,about);
    }
    async companyname(company_name){
        await this.selectOptionByText(this.companyNameLocator,company_name);
    }
    async headline(headline){
        await this.selectOptionByText(this.headlineLocator,headline);
    }
    async location(location){
        await this.selectOptionByText(this.locationLocator,location);
    }
    async lastname(last_name){
        await this.selectOptionByText(this.lastNameLocator,last_name);
    }
    async firstname(first_name){
        await this.selectOptionByText(this.firstNameLocator,first_name);
    }
    async selectprofileurl(Profile_Url){
        await this.selectOptionByText(this.profileUrlLocator,Profile_Url);
    }

    uploadspreadsheet(){
        return this.page.locator(this.uploadSpreadSheetLocator);
    }
}