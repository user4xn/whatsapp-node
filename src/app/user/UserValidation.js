const joi = require("joi");

const validation = joi.object({
    first_name: joi.string().trim(true).required(),
    last_name: joi.string().trim(true).required(),
    email: joi.string().email().trim(true).required(),
});

module.exports = validation
