'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getVendors: Joi.object().keys({
        page: Joi.number().required(),
        search: Joi.string().trim()

    }),

    id: Joi.object().keys({
        id: Joi.number().required()

    }),

    addVendor: Joi.object().keys({
        company:Joi.string().trim().required(),
        contact:Joi.string().trim().required(),
        email:Joi.string().trim().email().lowercase().min(5).max(100).required(),
        phone:Joi.number().required(),
        vendor_type:Joi.string().trim().required(),
        last_contacted:Joi.date().iso().required(),
        status: Joi.string().valid(['ACTIVE', 'INACTIVE']).trim().required(),
    }),

    updateVendor: Joi.object().keys({
        id: Joi.number().required(),
        company:Joi.string().trim(),
        contact:Joi.string().trim(),
        email:Joi.string().trim().email().lowercase().min(5).max(100),
        phone:Joi.number(),
        vendor_type:Joi.string().trim(),
        last_contacted:Joi.date().iso(),
        status: Joi.string().valid(['ACTIVE', 'INACTIVE']).trim(),
    }),
 
};