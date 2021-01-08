'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getLocations: Joi.object().keys({
        page: Joi.number().required()

    }),

    id: Joi.object().keys({
        id: Joi.number().required()

    }),

    addLocation: Joi.object().keys({
        managerId:Joi.number().required(),
        office:Joi.string().trim().required(),
        alias:Joi.string().trim().required(),
        nmlsId: Joi.number().required(),
        accountingId: Joi.string().trim().required(),
        address:Joi.string().trim().required(),
        phone: Joi.number().required(),
        website: Joi.string().trim().required(),
        websitePhoto:Joi.string().trim().required(),
        locationStatement:Joi.string().trim().required(),
        status: Joi.string().valid(['ACTIVE', 'INACTIVE']).trim().required(),
        StateLicenseInfo:Joi.array().items()
      
    }),
    updateLocation: Joi.object().keys({
        id:Joi.number().required(),
        managerId:Joi.number().required(),
        office:Joi.string().trim().required(),
        alias:Joi.string().trim().required(),
        nmlsId: Joi.number().required(),
        accountingId: Joi.string().trim().required(),
        address:Joi.string().trim().required(),
        phone: Joi.number().required(),
        website: Joi.string().trim().required(),
        websitePhoto:Joi.string().trim().required(),
        locationStatement:Joi.string().trim().required(),
        status: Joi.string().valid(['ACTIVE', 'INACTIVE']).trim().required(),
        isDeleted:Joi.number().valid([0, 1]),
        StateLicenseInfo:Joi.array().items()
      
    }),
};