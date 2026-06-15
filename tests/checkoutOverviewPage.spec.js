import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig.js";
import { ProductPage } from "../pages/ProductPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { LoginLocators } from "../locators/LoginLocators.js";
import { productPageLocators } from "../locators/ProductPageLocators.js";
import { CartPage } from "../pages/CartPage.js";
import { checkoutData } from "../test-data/checkoutData.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage.js";
import { productsToCart } from "../test-data/product.js";

test.describe("Checkout overview validation", () => {
    let loginPage
    let productPage
    let cartPage
    let checkoutPage
    let checkoutOverviewPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.getSpecificProdcutDetails(productsToCart)
        await productPage.clickOnCartLink()
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode)
        await checkoutPage.clickContinueButton()
    })

    test("Validate checkout overview page",async({page})=>{
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
        const elements = await checkoutOverviewPage.getCheckoutOverviewElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.cancelButton).toBeVisible()
        await expect(elements.finishButton).toBeVisible()
    })
    
    test("Validate cancel button",async({page})=>{
        await checkoutOverviewPage.clickCancel()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test.only("Validate item total calculatio",async({page})=>{
        const overviewProducts = await checkoutOverviewPage.getOverviewProducts()
        const calculatedTotal = overviewProducts.reduce((sum,{price})=>sum+parseFloat(price.replace("$","")),0)
        const uiItemTotal = await checkoutOverviewPage.getItemTotal() 

        expect(calculatedTotal).toBe(uiItemTotal)
    })

    test("Validate item total and tax",async({page})=>{
        const itemTotal = await checkoutOverviewPage.getItemTotal()
        const tax = await checkoutOverviewPage.getTax()
        const finalTotal = await checkoutOverviewPage.getTotal()

        const expectedFinalTotal = itemTotal + tax
        expect(finalTotal).toBe(expectedFinalTotal)
    })
    
})