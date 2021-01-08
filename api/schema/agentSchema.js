'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getAgents: Joi.object().keys({
        page: Joi.number().required()

    }),
    updateRoles: Joi.object().keys({
        id: Joi.number().required(),
        title: Joi.string().trim(),
        view: Joi.number(),
        add: Joi.number(),
        edit: Joi.number(),
        del: Joi.number(),
        detail: Joi.number()

    }),
    id: Joi.object().keys({
        id: Joi.number().required()

    }),

    addAgent: Joi.object().keys({
        firstName:Joi.string().trim().required(),
        lastName:Joi.string().trim().required(),
        alias:Joi.string().trim().required(),
        address:Joi.string().trim().required(),
        phone:Joi.number().required(),
        website:Joi.string().trim().required(),
        email:Joi.string().trim().email().lowercase().min(5).max(100).required(),
        qqId:Joi.number().required(),
        status:Joi.string().valid(['ACTIVE','INACTIVE']).trim().required(),
        // companyId:Joi.number().required()

    }),
    updateAgent: Joi.object().keys({
        id: Joi.number().required(),
        firstName:Joi.string().trim(),
        lastName:Joi.string().trim(),
        alias:Joi.string().trim(),
        address:Joi.string().trim(),
        phone:Joi.number(),
        website:Joi.string().trim(),
        email:Joi.string().trim().email().lowercase().min(5).max(100),
        qqId:Joi.number(),
        status:Joi.string().valid(['ACTIVE','INACTIVE']).trim(),
        companyId:Joi.number(),

    })
};