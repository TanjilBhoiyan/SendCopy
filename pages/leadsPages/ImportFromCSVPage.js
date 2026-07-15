export class ImprtFromCSVPage {
    constructor(page) {
        this.page = page;
        this.uploadSpreadSheetLocator = 'input[type="file"]';
        this.firstDropdownLocator = '(//button[@role="combobox"])[1]';
        this.OptionsLocator = 'div[data-slot="select-item"]';
        this.secondDropdownLocator = '(//button[@role="combobox"])[2]';
        this.thirdDropdownLocator = '(//button[@role="combobox"])[3]';
        this.fourthDropdownLocator = '(//button[@role="combobox"])[4]';
        this.fifthDropdownLocator = '(//button[@role="combobox"])[5]';
        this.sixthLocator = '(//button[@role="combobox"])[6]';
        this.seventhDropdownLocator = '(//button[@role="combobox"])[7]';
        this.emailaddressLocator = '(//button[@role="combobox"])[8]';
        this.customVariableButtonLocator = '//button[normalize-space()="Add custom variable"]';
        this.selectleadlistLocator = '#radix-_r_9_-content-people > div > div.space-y-6 > div.space-y-6 > div.grid.grid-cols-12.md\:gap-4.gap-2.items-end > div.space-y-1.md\:col-span-8.col-span-12 > button';
        this.createEmptylistLocator = '//button[normalize-space()="Create empty list"]';
        this.importLeadsButtonLocator = '//button[normalize-space()="Import Leads"]';
        this.listNameInputLocator = '//input[@placeholder="Enter list name"]';
        this.confirmButtonLocator = '//div[contains(text(),"Confirm")]';
        this.companyLocator = '(//button[normalize-space()="Company"])[1]';
        this.crossButtonLocator = '.lucide.lucide-x.w-4.h-4';
        this.addCustomVariableLocator = '//button[normalize-space()="Add custom variable"]';
        this.customVariableRowLocator = 'div.flex.items-center.gap-3.p-4.border.border-gray-200.rounded-lg';
        this.customVariableDeleteButtonLocator = '.lucide.lucide-trash2.lucide-trash-2.w-4.h-4';
    }
    async customVariableDeleteButton() {
        await this.page.locator(this.customVariableDeleteButtonLocator).click();
    }
    customVariableRow() {
        return this.page.locator(this.customVariableRowLocator);
    }
    addCustomVariable() {
        return this.page.locator(this.addCustomVariableLocator);
    }
    companyButton() {
        return this.page.locator(this.companyLocator);
    }
    importLeadsButton() {
        return this.page.locator(this.importLeadsButtonLocator);
    }
    async createEmptyList(list_name) {
        await this.page.locator(this.createEmptylistLocator).click();
        await this.page.locator(this.listNameInputLocator).fill(list_name);
        await this.page.locator(this.confirmButtonLocator).click();
    }

    async selectOptionByText(selector, searchText) {
        await this.page.locator(selector).click();
        const optionsLocator = this.page.locator(this.OptionsLocator);
        await optionsLocator.first().waitFor({ state: 'visible' });
        const options = await optionsLocator.all();
        let isFound = false;
        for (let option of options) {
            const text = await option.textContent();
            if (text && text.includes(searchText)) {
                await option.click();
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            for (let option of options) {
                const text = await option.textContent();
                if (text && text.includes("None")) {
                    await option.click();
                    break;
                }
            }
        }
    }
    async eighthDropdownItem(eighth_dropdown_text) {
        await this.selectOptionByText(this.emailaddressLocator, eighth_dropdown_text);
    }
    async seventhDropdownItem(seventh_dropdown_text) {
        await this.selectOptionByText(this.seventhDropdownLocator, seventh_dropdown_text);
    }
    async sixthDropdownItem(sixth_dropdown_text) {
        await this.selectOptionByText(this.sixthLocator, sixth_dropdown_text);
    }
    async fifthDropdownItem(fifth_dropdown_text) {
        await this.selectOptionByText(this.fifthDropdownLocator, fifth_dropdown_text);
    }
    async fourthDropdownItem(fourth_dropdown_text) {
        await this.selectOptionByText(this.fourthDropdownLocator, fourth_dropdown_text);
    }
    async thirdDropdownItem(third_dropdown_text) {
        await this.selectOptionByText(this.thirdDropdownLocator, third_dropdown_text);
    }
    async secondDropdownItem(second_dropdown_text) {
        await this.selectOptionByText(this.secondDropdownLocator, second_dropdown_text);
    }
    async firstDropdownItem(first_dropdown_text) {
        await this.selectOptionByText(this.firstDropdownLocator, first_dropdown_text);
    }
    uploadSpreadSheet() {
        return this.page.locator(this.uploadSpreadSheetLocator);
    }
    crossButton() {
        return this.page.locator(this.crossButtonLocator);
    }
}