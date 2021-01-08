'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    login: Joi.object().keys({
        email: Joi.string().trim().email().lowercase().min(5).max(100).required(),
        password: Joi.string().trim().min(6).max(18).required()
    }),
    getUsers: Joi.object().keys({
        page: Joi.number().required()

    }),
    createUser: Joi.object().keys({
        full_name: Joi.string().required(),
        role: Joi.number().required(),
        email: Joi.string().trim().email().lowercase().min(5).max(100).required(),
        password: Joi.string().trim().required(),
        country_code: Joi.number().required(),
        mobile_number: Joi.number().required(),
        user_type: Joi.number().required(),
        role: Joi.number().required(),
        status: Joi.number().required(),

    }),
    updateUser: Joi.object().keys({
        id: Joi.number().required(),
        full_name: Joi.string(),
        role: Joi.number(),
        email: Joi.string().trim().email().lowercase().min(5).max(100),
        password: Joi.string().trim(),
        country_code: Joi.number(),
        mobile_number: Joi.number(),
        user_type: Joi.number(),
        status: Joi.number(),

    })
};