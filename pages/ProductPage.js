
import { productPageLocators } from "../locators/ProductPageLocators"

export class ProductPage {
    constructor(page) {
        this.page = page
    }
    async logout() {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.logoutLink);
    }

    async openAboutPage() {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.aboutLink);
    }

    async validateAllProductDiplayed() {
        const names = await this.page.locator(productPageLocators.productNames).count();
        const desc = await this.page.locator(productPageLocators.productDescription).count();
        const prices = await this.page.locator(productPageLocators.productPrices).count();
        const buttonCount = await this.page.locator(productPageLocators.addToCartButton).count();

        // console.log(names+""+desc+""+prices+""+buttonCount);

        if (names === 0)
            throw new Error("No products found")

        if (names !== desc || names !== prices || names !== buttonCount)
            throw new Error("Mismatch between product details")

    }

    async addFirstProductToCart() {
        await this.page.locator(productPageLocators.addToCartButton).first().click()
    }
    async addAllProductsToCart() {
        const buttons = this.page.locator(productPageLocators.addToCartButton)
        const count = await buttons.count()
        console.log("count is " + count)
        for (let i = 0; i < count; i++) {
            const button = buttons.nth(i);
            // only click if it's still "Add to cart"
            if (await button.textContent() === "Add to cart") {
                await button.click();
            }
        }
    }

    async addSpecificProductsToCart(productName)
    {
        const addProducts = this.page.locator(productPageLocators.productNames);
        const count = await addProducts.count();

        for(let i = 0;i<count;i++)
        {
            const name = await addProducts.nth(i).textContent();
            if(name && productName.includes(name.trim()))
            {
                await this.page.locator(productPageLocators.addToCartButton).nth(i).click()
                await this.page.waitForTimeout(3000)
            }
        }
    }

    async filterByNameAtoZ()
    {
        await this.page.selectOption(productPageLocators.filterDropDown,"az")
    }
    async filterByNameZtoA()
    {
        await this.page.selectOption(productPageLocators.filterDropDown,"za")
    }
    async filterByPriceLoToHi()
    {
        await this.page.selectOption(productPageLocators.filterDropDown,"lohi")
    }
    async filterByPriceHiToLo()
    {
        await this.page.selectOption(productPageLocators.filterDropDown,"hilo")
    }

    async getProductNames()
    {
        return await this.page.locator(productPageLocators.productNames).allTextContents()
    }

    async getProductPrices()
    {
        const prices =  await this.page.locator(productPageLocators.productPrices).allTextContents()
        return prices.map(price =>parseFloat(price.replace('$','')))
    }

    async clickOnCartLink()
    {
        await this.page.locator(productPageLocators.cartLink).click()
    }

    async getFirstProdcutDetails()
    {
        const name = await this.page.locator(productPageLocators.productNames).first().textContent()
        const description = await this.page.locator(productPageLocators.productDescription).first().textContent()
        const price = await this.page.locator(productPageLocators.productPrices).first().textContent()

        return{
            name:name?.trim(),
            description:description?.trim(),
            price:price?.trim()
        }
    }

    async getAllProdcutDetails()
    {
        const allName = await this.page.locator(productPageLocators.productNames).allTextContents()
        const allDesc = await this.page.locator(productPageLocators.productDescription).allTextContents()
        const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents()

        const allProducts = allName.map((__,i)=>
        ({
            name : allName[i].trim(),
            description : allDesc[i].trim(),
            price : allPrices[i].trim()
        }))

        return allProducts
    }

    async getSpecificProdcutDetails(productName)
    {
        const allName = await this.page.locator(productPageLocators.productNames).allTextContents()
        const allDesc = await this.page.locator(productPageLocators.productDescription).allTextContents()
        const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents()

        const allProducts = allName.map((__,i)=>
        ({
            name : allName[i].trim(),
            description : allDesc[i].trim(),
            price : allPrices[i].trim()
        }))

        return allProducts.filter(p=>productName.includes(p.name))
    }
}