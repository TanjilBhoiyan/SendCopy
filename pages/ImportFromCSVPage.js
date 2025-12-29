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
    async eighthdropdownitem(eighth_dropdown_text){
        await this.selectOptionByText(this.emailaddressLocator,eighth_dropdown_text);
    }
    async seventhdropdownitem(seventh_dropdown_text){
        await this.selectOptionByText(this.seventhDropdownLocator,seventh_dropdown_text);
    }
    async sixthdropdownitem(sixth_dropdown_text){
        await this.selectOptionByText(this.sixthLocator,sixth_dropdown_text);
    }
    async fifthdropdownitem(fifth_dropdown_text){
        await this.selectOptionByText(this.fifthDropdownLocator,fifth_dropdown_text);
    }
    async fourthdropdownitem(fourth_dropdown_text){
        await this.selectOptionByText(this.fourthDropdownLocator,fourth_dropdown_text);
    }
    async thirddropdownitem(third_dropdown_text){
        await this.selectOptionByText(this.thirdDropdownLocator,third_dropdown_text);
    }
    async seconddropdownitem(second_dropdown_text){
        await this.selectOptionByText(this.secondDropdownLocator,second_dropdown_text);
    }
    async firstdropdownitem(first_dropdown_text){
        await this.selectOptionByText(this.firstDropdownLocator,first_dropdown_text);
    }
    uploadspreadsheet(){
        return this.page.locator(this.uploadSpreadSheetLocator);
    }
}