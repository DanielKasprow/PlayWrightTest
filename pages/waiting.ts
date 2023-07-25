import { Page } from "@playwright/test";

export class Waiting{
    page: Page;
    async waiting(name : string){
        await this.page.waitForSelector(name);        
    }
}