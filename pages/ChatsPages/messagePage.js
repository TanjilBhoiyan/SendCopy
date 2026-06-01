export class chatPage{
    constructor(page){
        this.page = page;
        this.chatButtonLocator='//a[@href="/chats"]';
        this.profilePicLocator='img.rounded-full'
    }
    async chatButton(){
        await this.page.locator(this.chatButtonLocator).click();
    }

    get profilePic(){
    return this.page.locator(this.profilePicLocator);
}
}