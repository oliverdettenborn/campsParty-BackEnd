const Joi = require('joi');

const signUp = Joi.object({
    cpf: Joi.string().pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/, 'cpf inválido').required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(16).required(),
    passwordConfirmation: Joi.ref('password'),
    ticketType: Joi.string().valid('none','hotel','tent').required(),
});

const signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const putTicketType = Joi.object({
    ticketType: Joi.string().valid('none','hotel','tent').required(),
});

module.exports = {
    signIn,
    signUp,
    putTicketType
}