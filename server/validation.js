//validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    });
    return schema.validate(data);
}

//User create Validation
const createUserValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        role: Joi.string().required()
    });
    return schema.validate(data);
}
//login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    });
    return schema.validate(data); 
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.createUserValidation = createUserValidation;