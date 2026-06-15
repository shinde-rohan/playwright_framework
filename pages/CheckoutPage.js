import { checkoutPageLocators } from "../locators/CheckoutPageLocators";

export class CheckoutPage
{
    constructor(page)
    {
        this.page = page
    }

    async getCheckoutElements()
    {
        return{
            pageInfo : this.page.locator(checkoutPageLocators.pageInfo),
            cancel : this.page.locator(checkoutPageLocators.cancelButton),
            continue : this.page.locator(checkoutPageLocators.continueButton)
        }
    }

    async fillCheckoutDetails(firstName,lastName,postalCode)
    {
        await this.page.locator(checkoutPageLocators.firstName).fill(firstName)
        await this.page.locator(checkoutPageLocators.lastName).fill(lastName)
        await this.page.locator(checkoutPageLocators.postalCode).fill(postalCode)
    }

    async clickCancelButton()
    {
         await this.page.locator(checkoutPageLocators.cancelButton).click()
    }

    async clickContinueButton()
    {
         await this.page.locator(checkoutPageLocators.continueButton).click()
    }

    async getErrorMessage()
    {
        return await this.page.locator(checkoutPageLocators.errorMsg).textContent()
    }
}