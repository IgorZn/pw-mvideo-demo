import { test } from '@fixtures/base.fixtures';

test.describe('Cart', async () => {

    test('Add product to cart', async ({ indexPage }) => {
        await indexPage.addProductToCart()
    });

    test('Delete product from cart (tooltip)', async ({ indexPage }) => {
        await indexPage.addProductToCart(0, {force: true})
        await indexPage.deleteProductFromCart()
    });

})

