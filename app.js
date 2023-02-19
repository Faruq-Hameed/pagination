const express = require('express');
const logger = require('morgan');
const Joi = require('joi')
require('dotenv').config()

let users = require('./db');
const {paginate,paginationError} = require('./paginate');
const schema = require('./schema')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'))

// users.length = 0

app.get('/users', (req, res) => {

    if (paginationError(users, req, res)) return; //an err res is sent if an err is present

    const paginatedResult = paginate(users, req)
    res.status(200).send(paginatedResult)

});


app.use('*', (req, res) => {
    res.status(404).send('invalid url') // for all unknown url(end point)
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

