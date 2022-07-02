module.exports = class Page {
    open () {
        browser.url("/");
        browser.maximizeWindow();
    };
};
