'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    addPrimaryMLO: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
        userId : Joi.number().required()
    }),
    updatePrimaryMLO: Joi.object().keys({
        id : Joi.number().strict().required(),
        loanAppNo: Joi.string().trim().required(),
        userId : Joi.number().required()
    }),
    listPrimaryMLO: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
    }),
    deletePrimaryMLO: Joi.object().keys({
        id : Joi.number().required(),
    }),
}