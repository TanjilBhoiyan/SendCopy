export class chatPage{
    constructor(page){
        this.page = page;
        this.chatButtonLocator='//a[@href="/chats"]';
    }
    async chatButton(){
        await this.page.locator(this.chatButtonLocator).click();
    }
}