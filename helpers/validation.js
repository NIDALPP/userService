const Joi = require('joi');

const authSchema = Joi.object({
    data: Joi.object().keys({
        // _id:Joi.string().min(6).required(),
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required().lowercase(),
        password: Joi.string().min(8).required(),
        role: Joi.string().valid('user', 'admin').required()
    }).required()
});
module.exports = {authSchema};
