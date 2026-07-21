export class LoginPage {

    constructor(page){
        this.page = page;
        // Login Locators
        this.emailInputLocator = '#_r_0_-form-item';
        this.passwordImputLocator = '#_r_1_-form-item',
        this.loginButtonLocator = 'button[type="submit"]';
        
        // Sign up Locators
        this.signupButtonLocator='//a[normalize-space()="Sign up"]'
        this.firstNameInputLocator=page.getByLabel('First Name');
        this.lastNameInputLocator= page.getByLabel('Last Name');
        this.signupEmailInputLocator=page.getByLabel('Email');
        this.signupPasswordInputLocator=page.locator('[name="password"]');
        this.confirmPasswordInputLocator=page.getByLabel('Confirm Password');
        this.createAccountButtonLocator='div[class="flex items-center justify-center gap-2"] span';
        this.checkBoxLocator='button[role="checkbox"]';
    }

    async gotoLoginPage(){
        await this.page.goto('https://qaapp.sendcopy.ai/');
    }

    async login(user_email , user_password){
        await this.page.locator(this.emailInputLocator).fill(user_email);
        await this.page.locator(this.passwordImputLocator).fill(user_password);
        await this.page.locator(this.loginButtonLocator).click();
    }
    async loginButton(){
        return this.page.locator(this.loginButtonLocator);
    }
    // async email_input(){
    //     return this.page.locator(this.emailInputLocator);
    // }
    async signUpButton(){
        return this.page.locator(this.signupButtonLocator);
    }
    async firstName(first_name){
        //await this.page.waitForTimeout(1000);
        await this.firstNameInputLocator.fill(first_name);
    }
    async lastName(last_name){
        //await this.page.waitForTimeout(1000);
        await this.lastNameInputLocator.fill(last_name);
    }
    async signUpEmail(signup_email){
        await this.signupEmailInputLocator.fill(signup_email);
    }
    async signUpPassword(signup_password){
        await this.signupPasswordInputLocator.fill(signup_password);
    }
    async confirmPassword(confirm_password){
        await this.confirmPasswordInputLocator.fill(confirm_password);
    }
    async createAccount(){
        await this.page.locator(this.createAccountButtonLocator).click();
    }
    signUpPageCheckBox(){
        return this.page.locator(this.checkBoxLocator);
    }

}