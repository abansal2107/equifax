'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    addSellersAgent: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
        agentId : Joi.number().required()        
    }),
    updateSellersAgent: Joi.object().keys({
        id : Joi.number().strict().required(),
        loanAppNo: Joi.string().trim().required(),
        agentId : Joi.number().required()
    }),       
    listSellersAgent: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
    }),    
    deleteSellersAgent: Joi.object().keys({
        id : Joi.number().required(),
    })
    
}