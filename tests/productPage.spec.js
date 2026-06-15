import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig.js";
import { ProductPage } from "../pages/ProductPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { LoginLocators } from "../locators/LoginLocators.js";
import { productPageLocators } from "../locators/ProductPageLocators.js";
import { productsToCart } from "../test-data/product.js";

test.describe("Product page validation", ()=>{
    let loginPage
    let productPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

    test("validate logout",async ({page})=>{
        productPage.logout()
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible()
    })
    test("validate about",async ({page})=>{
        productPage.openAboutPage()
        await expect(page.locator(productPageLocators.requestDemoButton)).toBeVisible()
        await page.goBack()
        await expect(page.locator(productPageLocators.settingIcon)).toBeVisible()
    })

    test("validate product details",async ({page})=>{
        await productPage.validateAllProductDiplayed()
        // await productPage.addFirstProductToCart()
        await productPage.addAllProductsToCart()
    })

    test("Add specific product",async ({page})=>{
        await productPage.addSpecificProductsToCart(productsToCart)
        
    })

    test("Filter by A to Z",async()=>{
        await productPage.filterByNameAtoZ()
        const names = await productPage.getProductNames()
        const sorted = [...names].sort()
        await expect(names).toEqual(sorted)
    })
    test("Filter by Z to A",async()=>{
        await productPage.filterByNameZtoA()
        const names = await productPage.getProductNames()
        const sorted = [...names].sort().reverse()
        await expect(names).toEqual(sorted)
    })
    test("Filter by Low to High",async()=>{
        await productPage.filterByPriceLoToHi()
        const prices = await productPage.getProductPrices()
        const sorted = [...prices].sort((a,b)=>a-b)
        await expect(prices).toEqual(sorted)
    })
    test.only("Filter by High to Low",async()=>{
        await productPage.filterByPriceHiToLo()
        const prices = await productPage.getProductPrices()
        const sorted = [...prices].sort((a,b)=>b-a)
        await expect(prices).toEqual(sorted)
    })
})