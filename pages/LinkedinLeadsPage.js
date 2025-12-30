exports.LinkedinLeadsPage = class LinkedinLeadsPage{
    constructor(page){
        this.page = page;
        this.leadsPageLocator = '.lucide.lucide-circle-user-round';
        this.searchListLocator= 'input[placeholder="Search lists"]';
        this.listNameSearchLocator = 'tbody tr:nth-child(1)';
        this.noresultLocator=page.getByText('No results.');


        this.alllistnameLocator = '[data-slot="table-body"]>[data-slot="table-row"]';
        this.leadsnumberLocator= 'td:nth-child(3)>div>span.text-sm.font-medium';

        this.addleadsButtonLocator='//button[normalize-space()="Add leads"]';

    }
    async linkedinleadLink(){
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