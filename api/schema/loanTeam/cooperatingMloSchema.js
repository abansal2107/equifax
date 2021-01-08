'use strict';
const Joi = require('@hapi/joi');

module.exports = {
 
    getCooperatingMLO: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        // search: Joi.string().allow('').required(),
    }),

    addCooperatingMLO: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        userId: Joi.number().required(),
    }),

    updateCooperatingMLO: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        userId: Joi.number().required(),
    }),

    id: Joi.object().keys({
        id: Joi.number().required(),
    }),
}