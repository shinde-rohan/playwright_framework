import { cartPageLocators } from "../locators/CartPageLocators";

export class CartPage {
    constructor(page) {
        this.page = page
    }

    async clickOnContinuShopping() {
        await this.page.locator(cartPageLocators.continueShoppingButton).click()
    }

    getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: this.page.locator(cartPageLocators.continueShoppingButton),
            checkout: this.page.locator(cartPageLocators.checkoutButton)
        };
    }

    async getCartProducts() {
        const allName = await this.page.locator(cartPageLocators.productNames).allTextContents()
        const allDesc = await this.page.locator(cartPageLocators.productDesc).allTextContents()
        const allPrices = await this.page.locator(cartPageLocators.productPrices).allTextContents()

        const allCartProducts = allName.map((__, i) =>
        ({
            name: allName[i].trim(),
            description: allDesc[i].trim(),
            price: allPrices[i].trim()
        }))

        return allCartProducts
    }

    async removeFirstProduct() {
        await this.page.locator(cartPageLocators.removeButton).click()
    }
    async clickCheckoutButton()
    {
        await this.page.locator(cartPageLocators.checkoutButton).click()
    }
}