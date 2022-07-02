const Page = require('./page');
const faker = require("@faker-js/faker").faker;

class CustomerInfoPage extends Page {

    get pageTitel() {
        return $("//span[contains(text(),'Checkout: Your Information')]");
    }
    get customerFirstName () {
        return $("#first-name");
    };

    get customerLastName () {
        return $("#last-name");
    };

    get customerZipCode() {
        return $("#postal-code");
    };

    get continueBtn() {
        return $("#continue");
    };

    async insertCustomerInfo () {
        const name = await this.customerFirstName;
        const surename = await this.customerLastName;
        const zip = await this.customerZipCode;

        const generatedName = faker.name.firstName();
        const generatedSurename = faker.name.lastName();
        const generatedZipCode = faker.address.zipCode();

        await name.setValue(generatedName);
        await surename.setValue(generatedSurename);
        await zip.setValue(generatedZipCode);
    };

    async clickOnContinueBtn() {
        const btn = await this.continueBtn;
        await btn.click();
    };
};

module.exports = new CustomerInfoPage();
