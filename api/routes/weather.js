const express = require('express');
const router = express.Router();
const puppeteer = require('../puppeteer.js');
const validate = require('../token.js');

router.get('/search', async function(req, res, next) {
    if(req.query.id && req.query.token && await validate.token(req.query.id,req.query.token)){
        if(req.query.q){
            const browser = await puppeteer.init();
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto('https://www.climatempo.com.br');
            await page.setViewport({width: 1280, height: 720});
            await page.type('.general-search-input',req.query.q,{delay: 300});
            const results = await page.evaluate(() => {
                const el = document.querySelectorAll('.autocomplete-list a');
                var item = [];
                el.forEach(el => {
                    item.push({id: el.href.replace('https://www.climatempo.com.br/previsao-do-tempo/cidade/','').split('/')[0], name: el.textContent});
                });
                return item;
            });
            await browser.close();
            res.status(200).json({message: 'Sucesso', status: 200, results: results});
        }else{
            res.status(400).json({message: 'Atributo inválido ou inexistente', status: 400});
        }
    }else{
        res.status(401).json({message: 'ID e/ou token da sua aplicação está inválida ou inexistente, ou atingiu o limite de requisições mensais', status: 401});
    }
});

module.exports = router;