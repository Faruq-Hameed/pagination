const express = require('express');
const logger = require('morgan');
const Joi = require('joi')
require('dotenv').config()

const users = require('./db');
const paginate = require('./paginate');
const schema = require('./schema')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'))

app.get('/users', (req, res, next) =>{
     validation = schema(req.query)
    
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    next()
})
//if the validation is successful
app.get('/users',(req, res) => {
    if(users.length === 0) return res.status(404).send('no users available');
    
    const  paginatedResult =  paginate(users, schema, req)
    res.status(200).send(paginatedResult)
});


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

