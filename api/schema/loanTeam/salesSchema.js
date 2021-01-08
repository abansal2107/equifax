'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getSales:Joi.object().keys({
        loanAppNo: Joi.string().allow('').trim().required(),
        role_id:Joi.number().required(),
    }),

    addSales: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
        role_id:Joi.number().required(),
        primaryMlo : Joi.number().required(),
        cooperatingMlo : Joi.number().allow(null).required(),
        mloa : Joi.number().allow(null).required(),
        pMloLocationId : Joi.number().required(),
        cMloLocationId : Joi.number().allow(null).required(),
        mloaLocationId : Joi.number().allow(null).required()
    }),

    updateSales: Joi.object().keys({
        id : Joi.number().allow('').required(),
        role_id:Joi.number().required(),
        loanAppNo: Joi.string().trim().required(),
        primaryMlo : Joi.number().required(),
        cooperatingMlo : Joi.number().allow(null).required(),
        mloa : Joi.number().allow(null).required(),
        pMloLocationId : Joi.number().required(),
        cMloLocationId : Joi.number().allow(null).required(),
        mloaLocationId : Joi.number().allow(null).required()
    })
       
    
}