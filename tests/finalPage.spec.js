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
import { FinalPage } from "../pages/FinalPage.js";

test.describe("Final page validation", () => {
    let loginPage
    let productPage
    let cartPage
    let checkoutPage
    let checkoutOverviewPage
    let finalPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        finalPage = new FinalPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.getSpecificProdcutDetails(productsToCart)
        await productPage.clickOnCartLink()
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode)
        await checkoutPage.clickContinueButton()
        await checkoutOverviewPage.clickFinish()
    })

    test("Validate final page",async({page})=>{
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
        const elements = await finalPage.getFinalPageElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.backHomeButton).toBeVisible()
        await expect(elements.successMsg).toBeVisible()
    })

    test("Validate success msg",async({page})=>{
        const message = await finalPage.getSuccessMsgText()
        expect(message).toBe("Thank you for your order!")
    })

    test("Validate back home",async({page})=>{
        await finalPage.clickOnBackHomeButton()
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })
})