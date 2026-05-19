import {BasePage} from "@pom/base.page";
import {expect, test} from "@playwright/test";
import {Locator} from "dorama";

export class IndexPage extends BasePage {
    url = () => "/";
    productTitle: string[] = [];
    readonly card = this.locator('mvid-tap-bar .nav-tab.tab-cart');
    readonly headerMiddle = this.locator('.app-header-middle.app-header-columns');

    readonly productCarousel = this.locator('//*[contains(@mtm, "placementTag")]//*[@class="mvid-carousel-inner"]');
    readonly cartItems = this.locator('.tooltip__item .items');

    async confirmAutoDetectCity() {
        await this.getPage().getByRole("button", { name: 'Все верно' }).click()
    }

    async confirmCookies() {
        await this.getPage().getByRole('button', { name: 'Понятно' }).click()
    }

    async updateCookies() {
        await this.confirmAutoDetectCity()
        await this.confirmCookies()
        // Save/Update storage
        console.log('Save context/cookies')
        await this.getPage().context().storageState({path: './test_data/auth.json'})
    }

    async waitTobeVisible(locator: Locator, opt?: {timeout?: number, visible?: boolean}) {
        await test.step('Await product carousel to be visible', async () => {
            await expect(locator).toBeVisible(opt)
        })
    }

    addProductToCart = async (nth = 0, options?: Record<string, any>) => {
        const stepTitle = nth > 0 ? `Put product to cart: ${nth}` : `Put product to cart`;

        await test.step(stepTitle, async () => {
            await this.productCard.addProduct.first().hover()
            await this.click('Click on add product button', this.productCard.addProduct, options)
            const [productTitle] = await this.productCard.setIndex(nth).productTitle
            this.productTitle.push(productTitle)
            await this.waitTobeVisible(this.cartItems)
            await expect(this.cartItems).toContainText(productTitle)

        });
    }

    deleteProductFromCart = async (nth = 0, options?: Record<string, any>) => {
        const [title] = this.productTitle
        await this.headerMiddle.hover({ position: { x: 10, y: 10 } })
        await this.card.hover()
        await expect(this.card).toBeVisible()
        const items = await this.cartItems.locator('.item-wrapper').all()
        const textTitles = await Promise.all(items.map(async item => item.innerText()))
        const titleIndex = textTitles.findIndex(el => el.startsWith(title.slice(0, 10)))

        await this.cartItems
            .locator('.delete-btn')
            .nth(titleIndex)
            .click({force: true})
    }
}
