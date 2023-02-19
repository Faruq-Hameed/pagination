const schema = require('./schema')


function paginationError(array, req,res){
    const validation = schema(req.query)

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message); //if the validation is not successful
        return true;
    }


    if (!array || array.length === 0) {
        res.status(404).send('no users available'); //return error if the database provide is undefined or empty
        return true;
    }

    const { page, limit } = validation.value  //using the validated input from the schema

    // incase the client is requesting for an exceeded limit or page number
    if(limit > array.length){
        res.status(404).send(`you have exceeded the maximum limit of ${Math.ceil(array.length)}`)
        return true;
    }

    if(page > (array.length / limit)){
        res.status(404).send(`you have exceeded the maximum page of ${Math.ceil(array.length / limit)}`) 
        return true;
    }

}

function paginate(array, req) {
    const validation = schema(req.query)

    const { page, limit } = validation.value  //using the validated input from the schema
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let result = {}
    // designing result object structure
    const totalPages = () => {
        const operationResult = (array.length / limit)
        if (!Number.isInteger(operationResult)) {// if the division result is a float value
            return Math.ceil(operationResult)
        }
        return operationResult
    }

    result.totalPages = totalPages() //using the return value of the function
    if (startIndex > 0) { //if another page(s) exist before the current page        
        result.previousPage = page - 1
    }

    result.currentPage = page  //the present page that is being displayed

    if (endIndex < array.length) { // if we have more page(s) after the current page
        result.nextPage = page + 1
    }

    result.limit = limit //limit as specified in the request. The maximum number of items per page 

    result.usersList = array.slice(startIndex, endIndex)//returning the specified portion of the users array
    return result

}

module.exports = {paginate, paginationError}