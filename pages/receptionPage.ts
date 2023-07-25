import { Page } from "@playwright/test";
import { Waiting } from "./waiting";

export default class ReceptionPage extends Waiting{

    buttonVisit = '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-fullWidth"]';
    buttonOrder = '//button[@id="consultationNestedMenu:prescriptionHeader"]';
    drugSearchNoValue = 'div[class="select-v2 css-2b097c-container"] >div';
    drugSearchOpen = '#react-select-2-input';

    selectPackageSize = 'div[class="fk-select fk-select--no-small-placeholder fk-select--font-lighter"]';
    select2 ='div[class="fk-select fk-select--no-small-placeholder fk-select--font-lighter"] >div >div >:nth-of-type(2)>div>div>:nth-of-type(2)';
    checkbox = 'label[class="fk-checkbox__label"]';
    buttonSelect = 'button[class="fk-button"]';
    


    constructor(page : Page){
        super();
        this.page = page;
    }

    async clickVisit(){
        await this.waiting(this.buttonVisit);
        await this.page.locator(this.buttonVisit).click();
    }

    async clickOrder(){
        await this.waiting(this.buttonOrder);
        await this.page.locator(this.buttonOrder).click();
    }

    async enterdrug(drugName: string){

        await this.waiting(this.drugSearchNoValue);
        await this.page.locator(this.drugSearchNoValue).click();

        await this.waiting(this.drugSearchOpen);
        await this.page.locator(this.drugSearchOpen).fill(drugName);

        await this.page.waitForTimeout(2000);
        await this.waiting(this.drugSearchOpen);
        await this.page.locator(this.drugSearchOpen).press('Enter');
        await this.page.waitForTimeout(1000);

    }

    async selectDrugVariant(){
        await this.waiting(this.selectPackageSize);
        await this.page.locator(this.selectPackageSize).click();
        
        await this.waiting(this.select2);
        await this.page.locator(this.select2).click();

        await this.waiting(this.checkbox);
        await this.page.locator(this.checkbox).check();

        await this.waiting(this.buttonSelect);
        await this.page.locator(this.buttonSelect).click();

    }
}