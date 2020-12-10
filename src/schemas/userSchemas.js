const Joi = require('joi');

const signUp = Joi.object({
    cpf: Joi.string().pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/, 'cpf inválido').required(),
    email: Joi.string().email().required(),
    ticketType: Joi.string().valid('none','hotel','tent').required(),
    password: Joi.string().alphanum().min(6).max(16).required(),
    passwordConfirmation: Joi.ref('password')
});

const signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    signIn,
    signUp
}