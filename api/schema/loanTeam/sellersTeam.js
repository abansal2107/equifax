'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    addSeller: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
        salesAgent:Joi.number().allow(null).required(),
        salesAgentAssistant:Joi.number().allow(null).required(),
        salesTeam:Joi.number().allow(null).required(),
    }),
    updateSeller: Joi.object().keys({
        id : Joi.number().strict().required(),
        loanAppNo: Joi.string().trim().required(),
        salesAgent:Joi.number().allow(null).required(),
        salesAgentAssistant:Joi.number().allow(null).required(),
        salesTeam:Joi.number().allow(null).required(),
    }),       
    listSeller: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
    }),    
    deleteSeller: Joi.object().keys({
        id : Joi.number().required(),
    }),
    sellerTeam: Joi.object().keys({
        id: Joi.number().required(),
    }),
    listSellerAgents: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
    }),
}