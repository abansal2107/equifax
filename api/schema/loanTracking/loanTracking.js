'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    createStatusUser: Joi.object().keys({
        loanAppId: Joi.number().required(),
        masterStatus:Joi.number().required(),
        changedBy:Joi.number().required(),
        comment: Joi.string().trim(),

    }),
    id: Joi.object().keys({
        id: Joi.number().required()
    }),

    
};