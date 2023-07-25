import { Page } from "@playwright/test";
import { Waiting } from "./waiting";

export default class finishOrderPage extends Waiting{
  

    checkboxDiscount = 'div[class="fk-input-wrapper telemedi-go"] >div >label';
    checkboxTickAll = 'div[class="fk-checkbox fk-input fk-check-all"]>label';
    pay = 'div > div > div > form > div > h3 > div';
    buttonMakeAnAppointment = 'div[class="buttons-wrapper"] :nth-of-type(2)';

    constructor(page : Page){
        super();
        this.page = page;
    }  
  
    async finishOrder(discount : boolean){        

        if(discount == false){
            await this.waiting(this.checkboxDiscount);
            await this.page.locator(this.checkboxDiscount).click();
        }

        await this.waiting(this.checkboxTickAll);
        await this.page.locator(this.checkboxTickAll).check();

        await this.page.waitForSelector(this.pay, { state: 'hidden' });

        await this.waiting(this.buttonMakeAnAppointment);
        await this.page.locator(this.buttonMakeAnAppointment).click();
    }
}