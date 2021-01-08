'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //ASSET
    addLoanSourceUser: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        sourceId:Joi.number().required(),
        name:Joi.string().trim().required(),
        role_id:Joi.number().required(),
    }),

 

    id: Joi.object().keys({
        id: Joi.number().required(),
        role_id:Joi.number().required()
    }),



}