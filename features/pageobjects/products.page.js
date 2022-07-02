const Page = require('./page');
const helper = require("../Helper/helper");

const itemsListLenght = 6;
let randomNum_arr = helper.generateRandomeNumberOfRandomeItems(itemsListLenght);

class ProductsPage extends Page {
   
    get ProductsPageTitle() {
        return $(".title");
    };

    get filterField() {
        return $(".product_sort_container");
    };

    get productsContainer() {
        return $(".inventory_container");
    };

    get shoppingCartBadge() {
        return $(".shopping_cart_badge");
    };

    async openCart() {
        const cart = await this.shoppingCartBadge;
        await cart.click();
    };

    async itemsNamesList() {
        let names_arr = [];
        for(let i=0; i<randomNum_arr.length; i++) {
            let item = await $(`.inventory_list>div:nth-child(${randomNum_arr[i]}) .inventory_item_name`);
            let item_name = await item.getText();
            names_arr.push(item_name);
        };
        return names_arr;
    };

    async itemsPricesList() {
        let prices_arr = [];
        for(let i=0; i<randomNum_arr.length; i++) {
            let item = await $(`.inventory_list>div:nth-child(${randomNum_arr[i]}) .inventory_item_price`);
            let item_price = await item.getText();
            prices_arr.push(item_price);
        };
        return prices_arr;
    };

    async addToCartButtonsList() {
        let buttons_arr = [];
        for(let i=0; i<randomNum_arr.length; i++) {
            let button = await $(`.inventory_list>div:nth-child(${randomNum_arr[i]}) button`);
            buttons_arr.push(button);
        };
        return buttons_arr;
    };

    async sortProductsLowToHigh() {
        const dropdown = await this.filterField;
        await dropdown.click();
        await dropdown.selectByVisibleText("Price (low to high)");
    };

    async selectRandomeNumberOfRandomeItems() {
        let names_arr = await this.itemsNamesList();
        let prices_arr = await this.itemsPricesList();
        let buttons_arr = await this.addToCartButtonsList();
        let productsList_arr = [];
        let obj = {};
        for(let i=0; i<names_arr.length; i++) {
            let item_name = names_arr[i];
            let item_price = prices_arr[i];
            obj={"name":item_name, "price": item_price};
            productsList_arr.push(obj);
            await buttons_arr[i].click();
        };
        return productsList_arr;
    };

    async quantityOfAddedItems() {
        let arr = await this.itemsNamesList();
        return arr.length;
    };
};

module.exports = new ProductsPage();
