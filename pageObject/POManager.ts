import { Page } from "playwright"
import LoginPage from "./LoginPage";

class POManager{
    public page:Page;
    public loginPage: LoginPage;

    constructor(page:Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }


}

export default POManager