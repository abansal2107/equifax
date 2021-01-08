'use strict';
const Joi = require('@hapi/joi');

module.exports = {
 
    getFullfillment: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        role_id:Joi.number().required(),
        // search: Joi.string().allow('').required(),
    }),

    addFullfillment: Joi.object().keys({
        loanAppNo: Joi.number().allow(null).required(),
        role_id:Joi.number().required(),
        setupCordinator: Joi.number().allow(null).required(),
        fullfillmentCordinator: Joi.number().allow(null).required(),
        closingCordinator: Joi.number().allow(null).required(),

    }),

    updateFullfillment: Joi.object().keys({
        id: Joi.number().required(),
        role_id:Joi.number().required(),
        loanAppNo: Joi.number().allow(null).required(),
        setupCordinator: Joi.number().allow(null).required(),
        fullfillmentCordinator: Joi.number().allow(null).required(),
        closingCordinator: Joi.number().allow(null).required(),


    }),



    id: Joi.object().keys({
        id: Joi.number().required(),
    }),
}