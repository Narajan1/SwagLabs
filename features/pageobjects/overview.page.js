const Page = require('./page');

class OverviewPage extends Page {

    get overviewPageTitle () {
        return $(".title");
    };

    get completeMessage() {
        return $(".complete-header");
    };

    get itemsListContainer() {
        return $(".cart_list");
    };

    get itemTotalPrice() {
        return $(".summary_subtotal_label");
    }

    get finishBtn () {
        return $("#finish");
    };

    async getItemTotal() {
        const element = await this.itemTotalPrice;
        let str = await element.getText();
        let temp = str.split("$");
        let total = parseFloat(temp[1]);
        return total;
    }

    async itemsNamesList() {
        const container = await this.itemsListContainer;
        const arr = await container.$$("a>div");
        const l = arr.length;
        const names_arr = [];
        let j = 3;
        for (let i=0; i<l; i++) {
            let temp = await $(`.cart_list div:nth-child(${j}) .inventory_item_name`);
            names_arr[i] = await temp.getText();
            j++;
        }
        return names_arr;
    };

    async itemsPricesList() {
        const container = await this.itemsListContainer;
        const arr = await container.$$(".inventory_item_price");
        const l = arr.length;
        const prices_arr = [];
        let j = 3;
        for (let i=0; i<l; i++) {
            let temp = await $(`.cart_list div:nth-child(${j}) .inventory_item_price`);
            prices_arr[i] = await temp.getText();
            j++;
        }
        return prices_arr;
    };

    async generateAllItemsTotalPrice() {
        const arr = await this.itemsPricesList();
        let sum = 0;
        for(let i=0; i<arr.length; i++) {
            let temp = arr[i].split("$");
            let num = parseFloat(temp[1]);
            sum+=num;
        };
        return sum;
    };

    async generateNamePriceObj() {
        let names_arr = await this.itemsNamesList();
        let prices_arr = await this.itemsPricesList();
        let productsList_arr = [];
        let obj = {};
        for(let i=0; i<names_arr.length; i++) {
            let item_name = names_arr[i];
            let item_price = prices_arr[i];
            obj={"name":item_name, "price": item_price};
            productsList_arr.push(obj);
        };
        return productsList_arr;
    };

    async clickOnFinishBtn () {
        const btn = await this.finishBtn;
        await btn.click();
    };
};

module.exports = new OverviewPage();
