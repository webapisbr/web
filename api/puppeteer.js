async function init() {
    const chromium = require("@sparticuz/chromium");
    const puppeteer = require("puppeteer-core");
    //const puppeteer = require('chrome-aws-lambda');
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    });
    return browser;
}
    
module.exports = { init };
