const Page = require('./page');

class LoginPage extends Page {

    get userName () {
        return $("#user-name");
    };

    get password () {
        return $("#password");
    };

    get loginBtn() {
        return $("#login-button");
    };

    async insertCredentialsAndLogin (username, password) {
        await this.userName.setValue(username);
        await this.password.setValue(password);
        await this.loginBtn.click();
    };

    open () {
        return super.open();
    };
};

module.exports = new LoginPage();
