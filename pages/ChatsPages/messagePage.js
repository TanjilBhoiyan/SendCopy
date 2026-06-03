export class chatPage{
    constructor(page){
        this.page = page;
        this.chatButtonLocator='//a[@href="/chats"]';
        this.profilePicLocator='img.rounded-full'
        //this.unseenFlagLocaotr='.bg-blue-500.rounded-full.w-5.h-5.flex.items-center.justify-center';
        this.unSeenFlagLocator='(//span[@class="text-xs text-white"][normalize-space()="1"])[1]';
        this.conversationThreeDotButtonLocator='(//button[contains(@type,"button")])[4]';
        this.markAsUnreadLocator='//span[normalize-space()="Mark as Unread"]';
        this.markAsReadLocator='//span[normalize-space()="Mark as Read"]';
    }
    async markAsRead(){
        await this.page.locator(this.markAsReadLocator).click();
    }
    async unSeenFlag(){
        return this.page.locator(this.unSeenFlagLocator);
    }
    async markAsUnread(){
        await this.page.locator(this.markAsUnreadLocator).click();
    }
    async conversationThreeDotButton(){
        await this.page.locator(this.conversationThreeDotButtonLocator).click();
    }
    async chatButton(){
        await this.page.locator(this.chatButtonLocator).click();
    }

    get profilePic(){
    return this.page.locator(this.profilePicLocator);
}
}