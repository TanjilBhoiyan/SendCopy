import { test , expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe.configure({mode:'serial'});


test.describe('Login Tests',()=>{
    /** @type {LoginPage} */
    let login;
    test.beforeEach(async ({page})=>{
        login = new LoginPage(page);
        await login.gotoLoginPage();
    })

    test('Login test Using Valid email and valid password' ,async ({page})=>{
        await login.login('shakilbhoiyan47@gmail.com','Shakil123@#?');
        // Assertion: Successfully logged in
        await expect(page).toHaveURL('https://app.sendcopy.ai/dashboard');
    })
    test('Login test using Valid email and Invalid password' , async ({page})=> {
        await login.login('shakilbhoiyan47@gmail.com','thisiswrongPassword');
        // Assertion: Error message visible
        await expect(page.getByText('invalid credentials')).toBeVisible();
    })
    test('Login test using Invalid email and Invalid password' , async ({page})=> {
        await login.login('thisiswrongemail@gmail.com','thisiswrongPassword')
        // Assertion: Error message visible
        await expect(page.getByText('invalid credentials')).toBeVisible();
    })
    test('Login test using Invalid email and Valid password' , async ({page})=> {
        await login.login('thisiswrongemail@gmail.com','Shakil123@#?')
        // Assertion: Error message visible
        await expect(page.getByText('invalid credentials')).toBeVisible();
    })
    test('Check Login button is visible/clickable',async({page})=>{
        await expect(await login.login_button()).toBeVisible();
        await expect(await login.login_button()).toBeEnabled();
    })
    test('Try to login with valid email but the email has not signed up yet',async({page})=>{
        await login.login('kheladhula12345@gmail.com','Shakil123@#?');
        // Assertion: Error message visible
        await expect(page.getByText('invalid credentials')).toBeVisible();

    })
})

// -------------------- SIGNUP TESTS ------------------------
test.describe('Signup Tests',()=>{
    /** @type {LoginPage} */
    let signup;
    test.beforeEach(async ({page})=>{
        //const signup = new LoginPage(page);
        await signup.gotoLoginPage();
        await (await signup.signupbutton()).click();
    })
    test('Check signup button clickable',async({page})=>{
        await expect(await signup.signupbutton()).toBeVisible();
        await expect(await signup.signupbutton()).toBeEnabled();
    })
    
    test('Check user can signup without first name',async({page})=>{
        //const signup = new LoginPage(page);
        await signup.lastname('Bhoiyan');
        await signup.signupemail('zysxx@gmail.com');
        await signup.signuppassword('Tanjil123@#?');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('First name is required')).toBeVisible();
    })
    test('Check user can signup without last name',async({page})=>{
        await signup.firstname('Tanjil');
        //await signup.lastname('Bhoiyan');
        await signup.signupemail('zysxx@gmail.com');
        await signup.signuppassword('Tanjil123@#?');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Last name is required')).toBeVisible();
    })
    test('Check user can signup using invalid email',async({page})=>{
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('zysxx@gmail');
        await signup.signuppassword('Tanjil123@#?');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    })
    test('Try to signup using less than 8 character password',async({page})=>{
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde@gmail.com');
        await signup.signuppassword('tanjil');
        // Assertion
        await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
    })
    test('If user does not use uppercase letter in password',async({page})=>{
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde@gmail.com');
        await signup.signuppassword('tanjilxyz');
        // Assertion
        await expect(page.getByText('Password must contain at least one uppercase letter')).toBeVisible();
    })
    test('If password is not contain at least one number',async({page})=>{
        //await page.waitForTimeout(1000);
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde@gmail.com');
        await signup.signuppassword('Tanjilxyz');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Password must contain at least one number')).toBeVisible();
    })
    test('If password is not contain at least one special character',async({page})=>{
        //await page.waitForTimeout(1000);
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde@gmail.com');
        await signup.signuppassword('Tanjil12');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Password must contain at least one special character')).toBeVisible();
    })
    test('Verify re-enter password does not match with password',async({page})=>{
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde@gmail.com');
        await signup.signuppassword('Tanjil123@#?');
        await signup.confirmpassword('Shakil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    })
    test('Check successful signup using valid info',async({page})=>{
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde4@gmail.com');
        await signup.signuppassword('Tanjil123@#?');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Signup successful')).toBeVisible();
    })
    test('Try to signup using already used email',async({page})=>{
        await signup.firstname('Tanjil');
        await signup.lastname('Bhoiyan');
        await signup.signupemail('abcde1@gmail.com');
        await signup.signuppassword('Tanjil123@#?');
        await signup.confirmpassword('Tanjil123@#?');
        await signup.createaccount();
        // Assertion
        await expect(page.getByText('Signup failed')).toBeVisible();
    })
    
})








// test.only('',async({page})=>{

// })

// test.only('',async({page})=>{

// })





//npx playwright test tests/LoginPageTest.spec.js --project chromium --headed
//npx playwright test --project=chromium --debug
