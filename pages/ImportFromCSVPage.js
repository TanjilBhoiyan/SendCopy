export class ImprtFromCSVPage{
    constructor(page){
        this.page = page;
        this.uploadSpreadSheetLocator = 'input[type="file"]';
        this.firstDropdownLocator='(//button[@role="combobox"])[1]';
        this.OptionsLocator='div[data-slot="select-item"]';
        this.secondDropdownLocator='(//button[@role="combobox"])[2]';
        this.thirdDropdownLocator='(//button[@role="combobox"])[3]';
        this.fourthDropdownLocator='(//button[@role="combobox"])[4]';
        this.fifthDropdownLocator='(//button[@role="combobox"])[5]';
        this.sixthLocator='(//button[@role="combobox"])[6]';
        this.seventhDropdownLocator='(//button[@role="combobox"])[7]';
        this.emailaddressLocator='(//button[@role="combobox"])[8]';
        this.customVariableButtonLocator='//button[normalize-space()="Add custom variable"]';
        this.selectleadlistLocator='#radix-_r_9_-content-people > div > div.space-y-6 > div.space-y-6 > div.grid.grid-cols-12.md\:gap-4.gap-2.items-end > div.space-y-1.md\:col-span-8.col-span-12 > button';
        this.createEmptylistLocator='//button[normalize-space()="Create empty list"]';
        this.importLeadsButtonLocator='//button[normalize-space()="Import Leads"]';
        this.listNameInputLocator='//input[@placeholder="Enter list name"]';
        this.confirmButtonLocator = '//div[contains(text(),"Confirm")]';
        this.companyLocator = '(//button[normalize-space()="Company"])[1]'
    }
    companybutton(){
        return this.page.locator(this.companyLocator);
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
    async selectcompanyname(Company_name){
        await this.selectOptionByText(this.firstDropdownLocator,Company_name);
    }
    async selectcompanyurl(companu_url){
        await this.selectOptionByText(this.secondDropdownLocator,companu_url);
    }
    async companylinkedinurl(linkedIn_profile_url){
        await this.selectOptionByText(this.thirdDropdownLocator,linkedIn_profile_url);
    }
    async companylocation(company_location){
        await this.selectOptionByText(this.fourthDropdownLocator,company_location);
    }
    async companyheadline(company_headline){
        await this.selectOptionByText(this.fifthDropdownLocator,company_headline);
    }
    async companyabout(company_about){
        await this.selectOptionByText(this.sixthLocator,company_about);
    }
    async companyemail(company_email){
        await this.selectOptionByText(this.sixthLocator,company_email);
    }


    async emailaddress(email_address){
        await this.selectOptionByText(this.emailaddressLocator,email_address);
    }
    async about(about){
        await this.selectOptionByText(this.seventhDropdownLocator,about);
    }
    async companyname(company_name){
        await this.selectOptionByText(this.sixthLocator,company_name);
    }
    async headline(headline){
        await this.selectOptionByText(this.fifthDropdownLocator,headline);
    }
    async location(location){
        await this.selectOptionByText(this.fourthDropdownLocator,location);
    }
    async lastname(last_name){
        await this.selectOptionByText(this.thirdDropdownLocator,last_name);
    }
    async firstname(first_name){
        await this.selectOptionByText(this.secondDropdownLocator,first_name);
    }
    async selectprofileurlPeople(Profile_Url){
        await this.selectOptionByText(this.firstDropdownLocator,Profile_Url);
    }

    uploadspreadsheet(){
        return this.page.locator(this.uploadSpreadSheetLocator);
    }
}