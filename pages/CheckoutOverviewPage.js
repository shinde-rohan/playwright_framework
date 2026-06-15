import { checkoutOverviewLocators } from "../locators/CheckoutOverviewLocators";

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page
    }

    getCheckoutOverviewElements()
     {
        return {
            pageInfo: this.page.locator(checkoutOverviewLocators.pageInfo),
            cancelButton: this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton: this.page.locator(checkoutOverviewLocators.finishButton)
        };
    }
    async getOverviewProducts()
     {
        const allName = await this.page.locator(checkoutOverviewLocators.productNames).allTextContents()
        const allDesc = await this.page.locator(checkoutOverviewLocators.productDescription).allTextContents()
        const allPrices = await this.page.locator(checkoutOverviewLocators.productPrices).allTextContents()

        const allCartProducts = allName.map((__, i) =>
        ({
            name: allName[i].trim(),
            description: allDesc[i].trim(),
            price: allPrices[i].trim()
        }))

        return allCartProducts
    }

    async getItemTotal()
    {
        const text = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent()
        return parseFloat(text?.replace("Item total: $","").trim())
    }

    async getTax()
    {
        const text = await this.page.locator(checkoutOverviewLocators.tax).textContent()
        return parseFloat(text?.replace("Tax: $","").trim())
    }
    async getTotal()
    {
        const text = await this.page.locator(checkoutOverviewLocators.total).textContent()
        return parseFloat(text?.replace("Total: $","").trim())
    }

    async clickCancel()
    {
        await this.page.locator(checkoutOverviewLocators.cancelButton).click()
    }
    async clickFinish()
    {
        await this.page.locator(checkoutOverviewLocators.finishButton).click()
    }
}