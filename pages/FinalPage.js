import { finalPageLocators } from "../locators/FinalPageLocators";

export class FinalPage {
    constructor(page) {
        this.page = page
    }

    getFinalPageElements() {
        return {
            pageInfo: this.page.locator(finalPageLocators.pageInfo),
            backHomeButton: this.page.locator(finalPageLocators.backHome),
            successMsg: this.page.locator(finalPageLocators.successMsg)
        };
    }

    async getSuccessMsgText()
    {
        const text = this.page.locator(finalPageLocators.successMsg).textContent()
        return text
    }

    async clickOnBackHomeButton()
    {
        await this.page.locator(finalPageLocators.backHome).click()
    }
}