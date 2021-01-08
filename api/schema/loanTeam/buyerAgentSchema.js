'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //ASSET
    getBuyerAgent: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        page: Joi.number().required(),
        search: Joi.string().allow('').required(),
    }),

    addBuyerAgent: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        agentId: Joi.number().required(),
        
        
    }),

    updateBuyerAgent: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        agentId: Joi.number().required(),
        id: Joi.number().required(),
        
    }),

    updateBuyer: Joi.object().keys({
        id: Joi.number().required(),
        loanAppNo: Joi.number().required(),
        name: Joi.string().allow('').required(),
        roleId: Joi.number().required(),
        location: Joi.string().allow('').required()
    }),


    id: Joi.object().keys({
        id: Joi.number().required(),
    }),



}