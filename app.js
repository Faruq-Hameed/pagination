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

let validation = '';
app.get('/users', (req, res, next) =>{
     validation = schema(req.query)
    
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    next()
})

// console.log( {validation})
// app.get('/users', paginate(users,validation), (req, res) => {
//     res.json(res.paginatedResult);
// });
app.get('/users', paginate(users), (req, res) => {
    res.json(res.paginatedResult);
});

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});





// app.get('/', (req, res) => {

//     const schema = Joi.object({
//         page: Joi.number().integer().min(1).default(1),
//         limit: Joi.number().integer().min(1).default(3),
//     }).validate(req.query)

//     if (schema.error) {
//         res.status(400).send(schema.error.details[0].message);
//         return;
//     }
   
//     const {page, limit} = schema.value  //using the validated input from the schema
//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     let result = {}//empty object that will hold the array of users specified in the

//     const totalPages = ()=>{
//         const operationResult = (users.length / limit )
//         if (!Number.isInteger(operationResult) ) {// if the division result is a float value
//             return Math.floor(operationResult) + 1
//         }
//         return operationResult
//     }
    
//     result.totalPages = totalPages() //using the return value of the function
//     if (startIndex > 0) { //if another page(s) exist before the current page        
//         result.previous = {
//             page: page - 1,
//             limit: limit
//         }
//     }

//     if (endIndex < users.length) { // if we have more page(s) after the current page
//         result.next = {
//             page: page + 1,
//             limit: limit
//         }
//     }
//     result.usersList = users.slice(startIndex, endIndex)//returning a portion of the users array
//     res.status(200).send(result)
// });





