const Joi = require('joi')
function schema(input) {
    const result = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).default(3),
    })
    return result.validate(input)
}

module.exports = schema


