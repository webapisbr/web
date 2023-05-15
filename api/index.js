const path = require('path')
const express = require('express')
const cors = require('cors');
const app = express()
const router = express.Router()


const weatherRouter = require('./routes/weather');
app.use('/weather', weatherRouter);

app.use('/',router)



app.use(function(req, res, next) {
    res.statusCode = 404;
    res.json({message: 'Rota inválida'});
});

app.listen(3000);

exports.handler = app;









