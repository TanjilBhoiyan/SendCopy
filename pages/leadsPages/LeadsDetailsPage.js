export class LeadsDetailsPage{
    constructor(page){
        this.page = page;

        this.leadsDeleteIconLocator='(//button)[4]';
        this.leadsDeteteButtonLocator='(//button[normalize-space()="Delete"])[1]';
        this.searchLeadsLocator='//input[@placeholder="Search leads"]';
        this.searchedRowLocator='//tr[@class="hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors border-b h-12 border-slate-200"]';
        this.exportToCSVLocator='//button[normalize-space()="Export to CSV"]';
    
    }
    exportToCSV(){
        return this.page.locator(this.exportToCSVLocator);
    }
    leadsDeleteButton(){
        return this.page.locator(this.leadsDeteteButtonLocator);
    }
    leadsDeleteIcon(){
        return this.page.locator(this.leadsDeleteIconLocator);
    }
    async searchLeads(search_item){
        await this.page.locator(this.searchLeadsLocator).fill(search_item);
    }
    async searchedRow(){
        return this.page.locator(this.searchedRowLocator);
    }
}