
import { ImprtFromCSVPage } from "../leadsPages/ImportFromCSVPage";

export class LinkedinLeadsPage{
    constructor(page){
        this.page = page;
        this.importFromCSVPage = new ImprtFromCSVPage(page);

        this.leadsPageLocator = '.lucide.lucide-circle-user-round';
        this.searchListLocator= 'input[placeholder="Search lists"]';
        this.listNameSearchLocator = 'tbody tr:nth-child(1)';
        this.noresultLocator=page.getByText('No results.');
        this.alllistnameLocator = '[data-slot="table-body"]>[data-slot="table-row"]';
        this.leadsnumberLocator= 'td:nth-child(3)>div>span.text-sm.font-medium';
        this.addleadsButtonLocator='//button[normalize-space()="Add leads"]';
        this.threeDotButtonLocator='(//button[@type="button"])[3]';
        this.leadListDeleteButtonLocator='//span[normalize-space()="Delete"]';
        this.deleteListConfirmButtonLocator='//button[normalize-space()="Confirm"]';
        this.leadListRenameButtonLocator='//span[normalize-space()="Rename"]';
        this.newListNameInputLocator='input[placeholder="Enter new list name"]';
        this.renameButtonLocator='//button[normalize-space()="Rename"]';
        this.exportFromCSVLocator='//span[normalize-space()="Export from CSV"]';

        this.excludeFromListButtonLocator='//span[normalize-space()="Exclude from list"]';
        this.selectListDropdownLocator='//span[normalize-space()="Select a list"]';
        this.excludeButtonLocator='//button[normalize-space()="Exclude"]';

        this.intersectListsButtonLocator='//span[normalize-space()="Intersect lists"]';

        this.combineListsButtonLocator='//span[normalize-space()="Combine lists"]';
        this.combineButtonLocator='//button[normalize-space()="Combine"]';
        this.intersectButtonLocator='//button[normalize-space()="Intersect"]';
        this.leadsLocator='(//div[@class="flex items-center gap-2 cursor-pointer"])[1]';

    }
    leads(){
        return this.page.locator(this.leadsLocator);
    }
    async excludeFromList(leads_name){
        await this.page.locator(this.excludeFromListButtonLocator).click();
        await this.page.locator(this.newListNameInputLocator).fill('Exclude automatic Lists');

        await this.importFromCSVPage.selectOptionByText(this.selectListDropdownLocator , leads_name );
        await this.page.locator(this.excludeButtonLocator).click();
    }
    async intersectLists(leads_name){
        await this.page.locator(this.intersectListsButtonLocator).click();
        await this.page.locator(this.newListNameInputLocator).fill('Intersect automatic Lists');

        await this.importFromCSVPage.selectOptionByText(this.selectListDropdownLocator , leads_name );
        await this.page.locator(this.intersectButtonLocator).click();
    }
    async combineLists(leads_name){
        await this.page.locator(this.combineListsButtonLocator).click();
        await this.page.locator(this.newListNameInputLocator).fill('Combined automatic Lists');
        //await this.page.locator(this.selectListDropdownLocator).click();
        await this.importFromCSVPage.selectOptionByText(this.selectListDropdownLocator , leads_name );
        await this.page.locator(this.combineButtonLocator).click();
    }
    selectListDropdown(){
        return this.page.locator(this.selectListDropdownLocator);
    }
    intersectFromListButton(){
        return this.page.locator(this.intersectListsButtonLocator);
    }
    excludeFromListButton(){
        return this.page.locator(this.excludeFromListButtonLocator);
    }
    exportFromCSV(){
        return this.page.locator(this.exportFromCSVLocator);
    }
    renameButton(){
        return this.page.locator(this.renameButtonLocator);
    }
    newListNameInput(){
        return this.page.locator(this.newListNameInputLocator);
    }
    leadListRename(){
        return this.page.locator(this.leadListRenameButtonLocator);
    }
    deleteListConfirmButton(){
        return this.page.locator(this.deleteListConfirmButtonLocator);
    }
    leadListDeleteButton(){
        return this.page.locator(this.leadListDeleteButtonLocator);
    }
    threeDotButton(){
        return this.page.locator(this.threeDotButtonLocator);
    }
    async linkedinLeadsLink(){
        await this.page.locator(this.leadsPageLocator).click();
    }
    async searchList(search_item){
        await this.page.locator(this.searchListLocator).fill(search_item);
    }
    async getRow(search_item){
        return this.page.locator(`tbody tr:has-text("${search_item}")`);
    }
    async noRresultVisible(){
        return this.noresultLocator;
    }
    allListName(){
        return this.page.locator(this.alllistnameLocator);
    }
    leadNumber(row){
        return row.locator(this.leadsnumberLocator);
    }
    async addLeadsButton(){
        await this.page.locator(this.addleadsButtonLocator).click();
    }

}