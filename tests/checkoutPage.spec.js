import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig.js";
import { ProductPage } from "../pages/ProductPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { LoginLocators } from "../locators/LoginLocators.js";
import { productPageLocators } from "../locators/ProductPageLocators.js";
import { CartPage } from "../pages/CartPage.js";
import { checkoutData } from "../test-data/checkoutData.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

test.describe("Checkout page validation", () => {
    let loginPage
    let productPage
    let cartPage
    let checkoutPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
    })

    test("Validate checkout page",async({page})=>{
        await cartPage.clickCheckoutButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

        const elements = await checkoutPage.getCheckoutElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.cancel).toBeVisible()
        await expect(elements.continue).toBeVisible()

    })

    test("Validate cancel button",async({page})=>{
         await cartPage.clickCheckoutButton()
         await checkoutPage.clickCancelButton()
         await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    })

    test("Validate continue button",async({page})=>{
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode)
        await checkoutPage.clickContinueButton()

    })

    test.only("Validate error message",async({page})=>{
        await cartPage.clickCheckoutButton()
        await checkoutPage.clickContinueButton()
        const error = await checkoutPage.getErrorMessage()

        expect(error?.trim()).toBe("Error: First Name is required")
    })

})