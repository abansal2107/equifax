'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getCompanies: Joi.object().keys({
        page: Joi.number().required()

    }),
    createCompany: Joi.object().keys({
        name:Joi.string().trim().required(),
        role:Joi.number().required(),
        locationId:Joi.number().required(),
        email:Joi.string().trim().email().lowercase().min(5).max(100).required(),
        phone:Joi.number().required(),
        website:Joi.string().trim(),
        nmlsId:Joi.number().required(),
        accountingId:Joi.string().trim().required(),
        managerId:Joi.number().required(),
        professionalImage:Joi.string().trim(),
        actionPhoto:Joi.string().trim(),
        
        professionalHistory:Joi.string().trim().required(),
        professionalStatement:Joi.string().trim().required(),
        status:Joi.string().valid(['ACTIVE', 'INACTIVE']).trim().required(),
        StateLicenseInfo:Joi.array().items()
    }),

    updateCompany: Joi.object().keys({
        id:Joi.number().required(),
        name:Joi.string().trim().required(),
        role:Joi.number().required(),
        locationId:Joi.number().required(),
        email:Joi.string().trim().email().lowercase().min(5).max(100).required(),
        phone:Joi.number().required(),
        website:Joi.string().trim().required(),
        nmlsId:Joi.number().required(),
        accountingId:Joi.string().trim().required(),
        managerId:Joi.number().required(),
        professionalImage:Joi.string().trim().required(),
        professionalHistory:Joi.string().trim().required(),
        professionalStatement:Joi.string().trim().required(),
        status:Joi.string().valid(['ACTIVE', 'INACTIVE']).trim().required(),
        StateLicenseInfo:Joi.array().items()
    }),

    id: Joi.object().keys({
        id: Joi.number().required()

    }),
};