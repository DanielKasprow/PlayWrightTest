import { Page } from "@playwright/test";
import { Waiting } from "./waiting";

export default class LoginPage extends Waiting{

    userName = 'input[id="username"]';
    password = 'input[id="password"]';

    loginButton = 'button[type="submit"]';

    constructor(page : Page){
        super();
        this.page = page;
    }
    
    async enterUserName(userName: string){
        await this.waiting(this.userName);
        await this.page.locator(this.userName).type(userName);
    }
    async enterPassword(password: string){
        await this.waiting(this.password);
        await this.page.locator(this.password).type(password);
    }
    async clickButtonLogin(){
        await this.waiting(this.loginButton);
        await this.page.locator(this.loginButton).click();
    }
    
}