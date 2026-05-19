import {Dorama, Locator} from "dorama";
import {ProductCardComponent} from "@components/product-card.component";
import {test} from "@fixtures/base.fixtures";


export abstract class BasePage extends Dorama.Page {
    readonly productCard = this.component(ProductCardComponent, '//*[contains(@mtm, "placementTag")]//*[@class="mvid-carousel-inner"]');

    async wait(timeout:number = 10000) {
        await this.getPage().waitForTimeout(timeout)
    }

    async click(title: string, locator: Locator, options?: Record<string, any>, nth = 0): Promise<void> {
        await test.step(title, async () => {
            await locator.nth(nth).click(options)
        })
    }
}