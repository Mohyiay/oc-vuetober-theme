// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function test(browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL;

        // assert that we only have exactly one <h1> on the page
        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementCount('h1', 1)
            .end();
    },
};
