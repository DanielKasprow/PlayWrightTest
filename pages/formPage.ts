import { Page } from "@playwright/test";
import { Waiting } from "./waiting";

export default class FormPage extends Waiting{

    acceptTermButton = 'button[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]';

    loginButton = '//a[@class="theme-light btn btn--secondary btn--medium"]';

    constructor(page : Page){
        super();
        this.page = page;
    }
    
    async navigae(url: string){
    
        await this.page.goto(url);
    }

    async acceptTerm(){
        await this.waiting(this.acceptTermButton);
        await this.page.locator(this.acceptTermButton).click();
    }
    async clickButtonLogin(){
        await this.waiting(this.loginButton);
        await this.page.locator(this.loginButton).click();
    }

}