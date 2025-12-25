export class LinkedinSearchCompanies{
    constructor(page){
        this.page = page;
        this.searchQueryInputLocator='//input[@id="keyword"]';
    }
    searchqueryinput(search_keyword){
        return this.page.locator(this.searchQueryInputLocator).fill(search_keyword);
    }
}