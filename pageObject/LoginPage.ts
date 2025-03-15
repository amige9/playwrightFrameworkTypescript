import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

class LoginPage{
    public page:Page;
    public emailField: Locator;
    public pwdField: Locator;
    public loginButton:Locator 

    constructor(page:Page){
        this.page = page;
        this.emailField = this.page.locator('#input-email');
        this.pwdField = this.page.locator('#input-password');
        this.loginButton = this.page.locator("input[value='Login']");
    }

    async goTo(){
        try {
            await this.page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
        } catch (error) {
            // console.error(`Failed to navigate to ${process.env.BASEURL}: ${error}`);
            throw error;
        }
    }

    async login(email:string, pwd:string){
        await this.emailField.fill(email);
        await this.pwdField.fill(pwd);
        await this.loginButton.click();
    }

    async verifyLoginIsSuccessful(title:string){
        const pageTitle = await this.page.title();
        console.log(pageTitle);
        expect(pageTitle).toEqual(title);
    }


}


export default LoginPage