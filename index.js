const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()

const chromium = require('chrome-aws-lambda');


app.use('/',router)

router.get('/', async (req, res)=>{
    let result = null;
    let browser = null;
    console.log(await chromium.executablePath)

    try {
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
  
      let page = await browser.newPage();
  
      await page.goto('https://cyclic.sh');
  
      result = await page.title();
    } catch (error) {
        throw error
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }

    return res.send(result)
})

app.listen(3000)
