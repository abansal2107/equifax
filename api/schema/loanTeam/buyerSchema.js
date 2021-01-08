'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //ASSET
    getBuyersDetails: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        role_id:Joi.number().required(),
    }),

    addBuyer: Joi.object().keys({
        role_id:Joi.number().required(),
        loanAppNo:Joi.number().required(),
        buyerAgent:Joi.number().allow(null).required(),
        buyerAgentAssistant:Joi.number().allow(null).required(),
        buyerAgentTeam:Joi.number().allow(null).required(),
        buyerAgentLocation:Joi.number().allow(null).required(),
        buyerAgentAssistantLocation:Joi.number().allow(null).required(),
        buyerAgentTeamLocation:Joi.number().allow(null).required(),
    }),

    updateBuyer: Joi.object().keys({
        id: Joi.number().required(),
        role_id:Joi.number().required(),
        loanAppNo:Joi.number().required(),
        buyerAgent:Joi.number().allow(null).required(),
        buyerAgentAssistant:Joi.number().allow(null).required(),
        buyerAgentTeam:Joi.number().allow(null).required(),
        buyerAgentLocation:Joi.number().allow(null).required(),
        buyerAgentAssistantLocation:Joi.number().allow(null).required(),
        buyerAgentTeamLocation:Joi.number().allow(null).required(),
    }),


    id: Joi.object().keys({
        id: Joi.number().required(),
        role_id:Joi.number().required()
    }),



}