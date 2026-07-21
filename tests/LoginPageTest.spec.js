import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import testData from '../testData/testData.json'

test.describe.configure({ mode: 'default' });

// -------------------- SIGNUP TESTS ------------------------
test.describe('Signup Tests', () => {
    /** @type {LoginPage} */
    let signup;
    test.beforeEach(async ({ page }) => {
        signup = new LoginPage(page);
        await signup.gotoLoginPage();
        await (await signup.signUpButton()).click();
    })

    // test.only('Check signup button clickable',async({page})=>{
    //     await expect(signup.signUpButton()).toBeVisible();
    //     await expect(await signup.signUpButton()).toBeEnabled();
    // })

    test('Should show validation when first name is empty', async ({ page }) => {
        //const signup = new LoginPage(page);
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail('zysxx@gmail.com');
        await signup.signUpPassword('Tanjil123@#?');
        await signup.confirmPassword('Tanjil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('First name is required')).toBeVisible();
    })
    test('Should show validation when last name is empty', async ({ page }) => {
        await signup.firstName('Tanjil');
        //await signup.lastName('Bhoiyan');
        await signup.signUpEmail('zysxx@gmail.com');
        await signup.signUpPassword('Tanjil123@#?');
        await signup.confirmPassword('Tanjil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Last name is required')).toBeVisible();
    })
    test('Check user can signup using invalid email', async ({ page }) => {
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail('zysxx@gmail');
        await signup.signUpPassword('Tanjil123@#?');
        await signup.confirmPassword('Tanjil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    })
    test('Try to signup using less than 8 character password', async ({ page }) => {
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail(testData.loginTestData.signUptestEmail);
        await signup.signUpPassword('tanjil');
        // Assertion
        await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
    })
    test('If user does not use uppercase letter in password', async ({ page }) => {
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail(testData.loginTestData.signUptestEmail);
        await signup.signUpPassword('tanjilxyz');
        // Assertion
        await expect(page.getByText('Password must contain at least one uppercase letter')).toBeVisible();
    })
    test('If password is not contain at least one number', async ({ page }) => {
        //await page.waitForTimeout(1000);
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail(testData.loginTestData.signUptestEmail);
        await signup.signUpPassword('Tanjilxyz');
        await signup.confirmPassword('Tanjil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Password must contain at least one number')).toBeVisible();
    })
    test('If password is not contain at least one special character', async ({ page }) => {
        //await page.waitForTimeout(1000);
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail(testData.loginTestData.signUptestEmail);
        await signup.signUpPassword('Tanjil12');
        await signup.confirmPassword('Tanjil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Password must contain at least one special character')).toBeVisible();
    })
    test('Verify re-enter password does not match with password', async ({ page }) => {
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail(testData.loginTestData.signUptestEmail);
        await signup.signUpPassword('Tanjil123@#?');
        await signup.confirmPassword('Shakil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    })
    test('Check successful signup using valid info', async ({ page }) => {

        // ১. JSON theke email-ta nao
        const baseEmail = testData.signupData.newValidEmail;
        const uniqueEmail = baseEmail.replace('@', `+${Date.now()}@`);

        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');

        await signup.signUpEmail(uniqueEmail);
        await signup.signUpPassword(testData.signupData.newPassword);
        await signup.confirmPassword(testData.signupData.newPassword);
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Signup successful')).toBeVisible();
    });
    test('Try to signup using already used email', async ({ page }) => {
        await signup.firstName('Tanjil');
        await signup.lastName('Bhoiyan');
        await signup.signUpEmail('abcde1@gmail.com');
        await signup.signUpPassword('Tanjil123@#?');
        await signup.confirmPassword('Tanjil123@#?');
        await signup.signUpPageCheckBox().click();
        await signup.createAccount();
        // Assertion
        await expect(page.getByText('Signup failed')).toBeVisible();
    })

})


test.describe('Login Tests', () => {
    /** @type {LoginPage} */
    let login;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await login.gotoLoginPage();
    })
    test('Login test Using Valid email and valid password', async ({ page }) => {
        await login.login(testData.loginTestData.validEmail, testData.loginTestData.validPassword);
        // Assertion: Successfully logged in
        await expect(page).toHaveURL('https://qaapp.sendcopy.ai/dashboard');
    })

    test('Login test using Valid email and Invalid password', async ({ page }) => {
        await login.login(testData.loginTestData.validEmail, testData.loginTestData.invalidPassword);
        // Assertion: Error message visible
        await expect(page.getByText('invalid credentials')).toBeVisible();
    })
    test('Login test using Invalid email and Invalid password', async ({ page }) => {
        await login.login(testData.loginTestData.invalidEmail, testData.loginTestData.invalidPassword)
        // Assertion: Error message visible
        await expect(page.getByText("This email isn't registered. Please sign up before logging in.")).toBeVisible();
    })
    test('Login test using Invalid email and Valid password', async ({ page }) => {
        await login.login(testData.loginTestData.invalidEmail, testData.loginTestData.validPassword)
        // Assertion: Error message visible
        await expect(page.getByText("This email isn't registered. Please sign up before logging in.")).toBeVisible();
    })
    test('Check Login button is visible/clickable', async ({ page }) => {
        await expect(await login.loginButton()).toBeVisible();
        await expect(await login.loginButton()).toBeEnabled();
    })
    test('Try to login with valid email but the email has not signed up yet', async ({ page }) => {
        await login.login('kheladhula12345@gmail.com', 'Shakil123@#?');
        // Assertion: Error message visible
        await expect(page.getByText("This email isn't registered. Please sign up before logging in.")).toBeVisible();
    })
})





// test.only('',async({page})=>{

// })

// test.only('',async({page})=>{

// })





//npx playwright test tests/LoginPageTest.spec.js --project chromium --headed
//npx playwright test --project=chromium --debug
