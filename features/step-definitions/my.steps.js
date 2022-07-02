const { Given, When, Then } = require('@wdio/cucumber-framework');
const cartPage = require('../pageobjects/cart.page');
const loginPage = require('../pageobjects/login.page');
const productsPage = require('../pageobjects/products.page');
const customerInfoPage = require("../pageobjects/cutomerInfo.page");
const overviewPage = require('../pageobjects/overview.page');
const expectChai = require("chai").expect;

let arr_productsList=[];
let productsList_arr = [];

Given(/^I am on the login page$/, async () => {
    await loginPage.open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await loginPage.insertCredentialsAndLogin(username, password);
});

Then(/^I should see a title saying (.*)$/, async (title) => {
    await expect(productsPage.ProductsPageTitle).toBeExisting();
    await expect(productsPage.ProductsPageTitle).toHaveTextContaining(title);
});

When("I sort from dropdown price from low to high", async () => {
    await productsPage.sortProductsLowToHigh();
});

When("I select random items and add to cart", async () => {
    arr_productsList =  await productsPage.selectRandomeNumberOfRandomeItems();
});

Then("I assert that shopping cart badge have text equal the quantity of added items", async () => {
    await (await productsPage.shoppingCartBadge).scrollIntoView();
    await expect(productsPage.shoppingCartBadge).toBeExisting();
    let quantityOfAddedItems = await productsPage.quantityOfAddedItems();
    await expect(productsPage.shoppingCartBadge).toHaveTextContaining(quantityOfAddedItems.toString());
});

When("I open shopping cart page", async () => {
    await productsPage.openCart();
});

When("I click on checkout button", async () => {
    await (await cartPage.checkoutBtn).scrollIntoView();
    await cartPage.clickOncheckoutBtn();
});

Then("I should see a customer info page", async () => {
    await expect(customerInfoPage.pageTitel).toBeExisting();
    await expect(customerInfoPage.pageTitel).toHaveTextContaining("CHECKOUT:");
});

When("I fill customer information", async () => {
    await customerInfoPage.insertCustomerInfo();
});

When("I click on Continue button", async () => {
    await (await customerInfoPage.continueBtn).scrollIntoView();
    await customerInfoPage.clickOnContinueBtn();
});

Then("I should see a Overview page", async () => {
    await expect(overviewPage.overviewPageTitle).toBeExisting();
    await expect(overviewPage.overviewPageTitle).toHaveTextContaining("OVERVIEW");
});

When("I get added items names and prices from Overview pages", async () => {
    productsList_arr = await overviewPage.generateNamePriceObj();
});

Then("I assert that the information should be the same as in products page", async () => {
    let str1 = JSON.stringify(productsList_arr);
    let str2 = JSON.stringify(arr_productsList);
    expectChai(str1).to.be.equal(str2);
    
    const itemTotal = await overviewPage.getItemTotal();
    const generatedTotalPrice = await overviewPage.generateAllItemsTotalPrice();
    expectChai(itemTotal).to.be.equal(generatedTotalPrice);
});

When("I click on Finish button", async () => {
    await (await overviewPage.finishBtn).scrollIntoView();
    await overviewPage.clickOnFinishBtn();
    await browser.pause(2000);
});

Then("I should see the message about completing the order", async () => {
    await expect(overviewPage.completeMessage).toBeExisting();
    await expect(overviewPage.completeMessage).toHaveTextContaining("THANK YOU FOR YOUR ORDER");
});
