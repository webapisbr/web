async function init() {
    const puppeteer = require('chrome-aws-lambda');
    const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    const executablePath = await puppeteer.executablePath || LOCAL_CHROME_EXECUTABLE;
    const browser = await puppeteer.puppeteer.launch({
        args: puppeteer.args,
        defaultViewport: puppeteer.defaultViewport,
        executablePath: executablePath,
        headless: puppeteer.headless,
        ignoreHTTPSErrors: true
    });
    return browser;
}
    
module.exports = { init };