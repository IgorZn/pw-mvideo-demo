import { Dorama } from 'dorama';

/*
* Я не стал описывать всю карточку товара, только самый минимум.
* остальное делается плюс-минус по аналогии.
* */

export class ProductCardComponent extends Dorama.Component{
    currentIndex: number;

    constructor(locator?: any, index?: number) {
        super(locator, index)
        this.currentIndex = 0
    }
    readonly addProduct = this.locator('.product-checkout__button');

    public setIndex(index: number) {
        this.currentIndex = index;
        return this;
    }

    public get productTitle() {
        return this.locator('.product-mini-card__name').nth(this.currentIndex).allInnerTexts()
    };
}