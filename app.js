const express = require('express');
const logger = require('morgan');
const Joi = require('joi')
 
require('dotenv').config()

//
const users = require('./db') //using the users of another project(e-commerce project)

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const schema = Joi.object({
        limit: Joi.number().default(3), //incase limit is not specified the default value is used
        page: Joi.number().default(1) //incase page is not specified the default value is used
    })

        .validate(req.query)
        //after validation if input is provide or not
    // const {limit,page} = schema.value
    const page = parseInt(schema.value.page);
    const limit = parseInt(schema.value.limit);
    // const startIndex = (page - 1) * limit
    // const endIndex = page  * limit

    // const result = users.slice(startIndex,endIndex)
    // res.status(200).send(result)
    const result = {}
    
});
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

