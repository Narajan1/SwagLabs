const Page = require('./page');

class CartPage extends Page {

    get checkoutBtn () {
        return $("#checkout");
    };

    async clickOncheckoutBtn () {
        const btn = await this.checkoutBtn;
        await btn.click();
    };
};

module.exports = new CartPage();
