exports.LinkedinLeadsPage = class LinkedinLeadsPage{


    constructor(page){
        this.page = page;
        this.leadsPageLocator = '.lucide.lucide-circle-user-round';
        this.searchListLocator= 'input[placeholder="Search lists"]';
        this.listNameSearchLocator = 'tbody tr:nth-child(1)';
        this.noresultLocator=page.getByText('No results.');


        this.alllistName = '[data-slot="table-body"]>[data-slot="table-row"]';
        this.leadsnumber= 'td:nth-child(3)>div>span.text-sm.font-medium';

    }
    async linkedinleadLink(){
        await this.page.locator(this.leadsPageLocator).click();
    }
    async searchlist(search_item){
        await this.page.locator(this.searchListLocator).fill(search_item);
    }
    async getRow(search_item){
        return this.page.locator(`tbody tr:has-text("${search_item}")`);
    }
    async noRresultVisible(){
        return this.noresultLocator;
    }
    allListname(){
        return this.page.locator('[data-slot="table-body"]>[data-slot="table-row"]');
    }
    leadNumber(row){
        return row.locator(this.leadsnumber);
    }

}