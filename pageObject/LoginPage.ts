import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

class LoginPage {
    public page: Page;
    public emailField: Locator;
    public pwdField: Locator;
    public loginButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator("#email");
        this.pwdField = this.page.locator('#password');
        this.loginButton = this.page.locator("button[type='submit']");
    }


    // Method to navigate to the login page URL, using the environment variable for the base URL
    async goTo() {
        console.log("Loaded BASEURL:", process.env.BASEURL);
        const loginUrl = process.env.BASEURL; // Get the base URL from environment variables
        if (!loginUrl) {
            throw new Error("BASEURL is not defined in environment variables."); // Error handling
        }
        await this.page.goto(loginUrl, { timeout: 90000 });
    }


    async login(email:string, pwd:string) {
        await this.emailField.fill(email);
        await this.pwdField.fill(pwd);
        await this.loginButton.click();
    }

    async verifyLoginIsSuccessful(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toEqual(title);
    }


}


export default LoginPage