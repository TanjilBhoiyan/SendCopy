exports.LoginPage = class LoginPage {

    constructor(page){
        this.page = page;
        this.emailInputLocator = '#_r_0_-form-item';
        this.passwordImputLocator = '#_r_1_-form-item',
        this.loginButtonLocator = 'button[type="submit"]';
    }

    async gotoLoginPage(){
        await this.page.goto('https://app.sendcopy.ai');
    }

    async login(user_email , user_password){
        await this.page.locator(this.emailInputLocator).fill(user_email);
        await this.page.locator(this.passwordImputLocator).fill(user_password);
        await this.page.locator(this.loginButtonLocator).click();
    }
    async login_button(){
        return this.page.locator(this.loginButtonLocator);
    }
    // async email_input(){
    //     return this.page.locator(this.emailInputLocator);
    // }
}