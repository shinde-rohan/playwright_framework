import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig.js";
import { ProductPage } from "../pages/ProductPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { LoginLocators } from "../locators/LoginLocators.js";
import { productPageLocators } from "../locators/ProductPageLocators.js";
import { productsToCart } from "../test-data/product.js";
import { CartPage } from "../pages/CartPage.js";

test.describe("Cart page validation", () => {
    let loginPage
    let productPage
    let cartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

    test("Validate cart page", async ({ page }) => {
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

        const ui = cartPage.getCartPageElements();
        await expect(ui.cartTitle).toBeVisible();
        await expect(ui.shoppingCart).toBeVisible();
        await expect(ui.checkout).toBeVisible();
    })

    test("Validate continue shopping", async ({ page }) => {
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await cartPage.clickOnContinuShopping()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("Validate single product", async ({ page }) => {
        const firstProduct = await productPage.getFirstProdcutDetails()
        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()

         const cartProducts = await cartPage.getCartProducts()
         expect(cartProducts[0]).toEqual(firstProduct)
    })

    test("Validate all products", async ({ page }) => {
        const allProductDetails = await productPage.getAllProdcutDetails()
        await productPage.addAllProductsToCart()
        await productPage.clickOnCartLink()
        const cartProducts = await cartPage.getCartProducts()
        expect(cartProducts).toEqual(allProductDetails)
    })

    test("Validate specific product", async ({ page }) => {
        const specificProductDetails = await productPage.getSpecificProdcutDetails(productsToCart)
        await productPage.addSpecificProductsToCart(productsToCart)
        await productPage.clickOnCartLink()
        const cartProducts = await cartPage.getCartProducts()
        expect(cartProducts).toEqual(specificProductDetails)
    })

    test.only("Validate remove product", async ({ page }) => {
        // await productPage.addAllProductsToCart()
        // await productPage.clickOnCartLink()
        // const initialProduct = await cartPage.getCartProducts()
        // expect(initialProduct.length).toBeGreaterThan(0)
        // await cartPage.removeFirstProduct()
        // const updatedCartProducts = await cartPage.getCartProducts()
        // expect(updatedCartProducts.length).toBe(initialProduct.length-1);

        await productPage.addFirstProductToCart()
        await productPage.clickOnCartLink()
        await cartPage.removeFirstProduct()
        const finalProduct = await cartPage.getCartProducts()
        expect(finalProduct.length).toBe(0)
    })
})