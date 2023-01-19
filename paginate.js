const Joi = require('joi')
const schema = require('./schema')

//pagination middleware
// function paginate(array, schema) {
function paginate(array) {
    return (req, res, next) => {
       const validation = schema(req.query)
        const { page, limit } = validation.value  //using the validated input from the schema
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        let result = {}
        // designing result object structure
        const totalPages = () => {
            const operationResult = (array.length / limit)
            if (!Number.isInteger(operationResult)) {// if the division result is a float value
                return Math.floor(operationResult) + 1
            }
            return operationResult
        }

        result.totalPages = totalPages() //using the return value of the function
        if (startIndex > 0) { //if another page(s) exist before the current page        
            result.previousPage = page - 1
        }
        
        result.currentPage = page

        if (endIndex < array.length) { // if we have more page(s) after the current page
            result.nextPage = page + 1
        }

        result.limit = limit

        result.usersList = array.slice(startIndex, endIndex)//returning a portion of the users array
        res.paginatedResult = result
        next()
    }
}
module.exports = paginate