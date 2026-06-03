import { test , expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { chatPage } from '../../pages/ChatsPages/messagePage';

test.describe.configure({mode:'serial'});

test.describe('Linkedin Leads Test',()=>{
    /** @type { chatPage } */
    let chatButton;
    test.beforeEach(async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.login('regressiontest5@gmail.com','Shakil123@#?');
        chatButton = new chatPage(page);
        await chatButton.chatButton();

        // create object for generate leads page
    })
    test.only('Conversation are moved to archived after click on archive',async ({page})=>{
        
    })
    test.only('When click on mar as read should not showing unread flag on the conversation',async ({page})=>{
        await chatButton.conversationThreeDotButton();
        await chatButton.markAsRead();
        await expect(page.getByText('Conversation marked as read')).toBeVisible();
        //await expect(chatButton.unSeenFlag()).toBeEnabled();
        
    })
    test('when click on mark as unread should showing unread flag on the conversation',async ({page})=>{
        await chatButton.conversationThreeDotButton();
        await chatButton.markAsUnread();
        await expect(page.getByText('Conversation marked as unread')).toBeVisible();
        //await expect(chatButton.unSeenFlag()).toBeEnabled();
    })
    test('Check the conversation profile picture are visible or not',async ({page})=>{
        const count = await chatButton.profilePic.count();
        //console.log(count);
        for (let i = 0; i < count; i++) {
            await expect(chatButton.profilePic.nth(i)).toBeVisible();
        }
    })
})

// npx playwright test tests/ChatsTests/messageTest.spec.js --project chromium --debug
