const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()



app.use('/',router)

router.get('/', async (req, res)=>{

    return res.send('ok')
})

app.listen(3000)
