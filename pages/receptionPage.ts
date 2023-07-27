import { Page } from "@playwright/test";
import { Waiting } from "./waiting";

export default class ReceptionPage extends Waiting{

    buttonVisit = '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-fullWidth"]';
    buttonOrder = '//button[@id="consultationNestedMenu:prescriptionHeader"]';
    drugSearchNoValue = 'div[class="select-v2 css-2b097c-container"] >div';
    drugSearchOpen = '#react-select-2-input';
    drugSearchResult = 'div[class="menu__wrapper"] >div>div>div:nth-of-type(2)';

    selectPackageSizeClose = 'div[class="fk-select fk-select--no-small-placeholder fk-select--font-lighter"]';
    selectPackageSizeMenu = 'div[class=" css-11unzgr"]>div';
    checkboxTerm = 'label[class="fk-checkbox__label"]';
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

    async enterDrug(drugName: string){

        await this.waiting(this.drugSearchNoValue);
        await this.page.locator(this.drugSearchNoValue).click();

        await this.waiting(this.drugSearchOpen);
        await this.page.locator(this.drugSearchOpen).fill(drugName);

        await this.page.locator(this.drugSearchResult).filter({hasText: drugName}).click();

    }

    async selectDrugVariant(variantDrug: string){
        await this.waiting(this.selectPackageSizeClose);
        await this.page.locator(this.selectPackageSizeClose).click();

        await this.page.locator(this.selectPackageSizeMenu).filter({hasText: variantDrug}).click();
        
        await this.page.locator(this.checkboxTerm).check();

        await this.page.locator(this.buttonSelect).click();

    }
}