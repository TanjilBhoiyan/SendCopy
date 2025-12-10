import { test , expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe.configure({mode:'serial'});

test ('Login test Using Valid email and valid password' ,async ({page})=>{

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');

    // Assertion: Successfully logged in
    await expect(page).toHaveURL('https://app.sendcopy.ai/dashboard');
})

test('Login test using Valid email and Invalid password' , async ({page})=> {

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('shakilbhoiyan47@gmail.com','thisiswrongPassword');

    // Assertion: Error message visible
    await expect(page.getByText('invalid credentials')).toBeVisible();
})
test('Login test using Invalid email and Invalid password' , async ({page})=> {

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('thisiswrongemail@gmail.com','thisiswrongPassword')

    // Assertion: Error message visible
    await expect(page.getByText('invalid credentials')).toBeVisible();
})
test('Login test using Invalid email and Valid password' , async ({page})=> {

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('thisiswrongemail@gmail.com','Shakil123@#?')

    // Assertion: Error message visible
    await expect(page.getByText('invalid credentials')).toBeVisible();
})
test('Check Login button is visible/clickable',async({page})=>{
    const login = new LoginPage(page);

    await login.gotoLoginPage();
    await expect(await login.login_button()).toBeVisible();
    await expect(await login.login_button()).toBeEnabled();
})
test('Try to login with valid email but the email has not signed up yet',async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('kheladhula12345@gmail.com','Shakil123@#?');
    // Assertion: Error message visible
    await expect(page.getByText('invalid credentials')).toBeVisible();

})





//npx playwright test tests/LoginPageTest.spec.js --project chromium --headed
//npx playwright test --project=chromium --debug
