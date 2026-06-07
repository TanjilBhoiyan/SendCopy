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
    test.only('If try to send greter than 3 mb individual picture',async ({page})=>{
        const filChooserPromise = page.waitForEvent('filechooser');
        await chatButton.attachment().click();

        const filechooser = await filChooserPromise;
        await filechooser.setFiles('UploadFiles\\attachment10.JPG');
        await expect(chatButton.sendButton()).toBeDisabled();
        await expect(chatButton.overSizeAttachmentError()).toBeVisible();
    })
    test('check send button is not enable if select gretter than 5 mb file',async({page})=>{
        const fileChooserPromise = page.waitForEvent('filechooser');
        await chatButton.attachment().click();

        const filechooser = await fileChooserPromise;
        await filechooser.setFiles([
            'UploadFiles\\attachment1.png',
            'UploadFiles\\attachment2.png',
            'UploadFiles\\attachment3.png',
            'UploadFiles\\attachment4.png',
            'UploadFiles\\attachment5.png',
            'UploadFiles\\attachment6.png',
            'UploadFiles\\attachment7.png',
            'UploadFiles\\attachment8.JPG',
            'UploadFiles\\attachment9.JPG'
        ])
        await expect(chatButton.sendButton()).toBeDisabled();
    })
    test('Send a attachment',async ({page})=>{
        const fileChooserProise = page.waitForEvent('filechooser');

        await chatButton.attachment().click();

        const filechooser = await fileChooserProise;
        await filechooser.setFiles('UploadFiles\\attachment1.png');
        await chatButton.sendButton().click();
    })
    test('Send a test message',async ({page})=>{
        await chatButton.writeMessage('Hello this is test message');
        await chatButton.sendButton().click();
    })
    // test('Edit message',async ({page})=>{

    // })
    test('Delete the conversation',async ({page})=>{
        await chatButton.conversationThreeDotButton();
        await chatButton.conversationDelete();
        await expect(page.getByText('Conversation deleted')).toBeVisible();
    })
    test('Conversation are moved to archived after click on archive',async ({page})=>{
        await chatButton.conversationThreeDotButton();
        await chatButton.archive();
        await expect(page.getByText('Conversation archived')).toBeVisible();
    })
    test('When click on mar as read should not showing unread flag on the conversation',async ({page})=>{
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
