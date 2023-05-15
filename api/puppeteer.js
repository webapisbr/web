async function init() {
    const puppeteer = require('chrome-aws-lambda');
    const browser = await puppeteer.puppeteer.launch({
        args: puppeteer.args,
        defaultViewport: puppeteer.defaultViewport,
        executablePath: await puppeteer.executablePath,
        headless: puppeteer.headless,
        ignoreHTTPSErrors: true
    });
    return browser;
}
    
module.exports = { init };
