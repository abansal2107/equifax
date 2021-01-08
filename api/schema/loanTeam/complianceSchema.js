'use strict';
const Joi = require('@hapi/joi');

module.exports = {
 
    getCompliance: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        // search: Joi.string().allow('').required(),
    }),

    addCompliance: Joi.object().keys({
        loanAppNo: Joi.number().required(),
        postClosingReviewer: Joi.number().valid(null).required()

    }),

    updateCompliance: Joi.object().keys({
        id: Joi.number().required(),
        loanAppNo: Joi.number().required(),
        postClosingReviewer: Joi.number()

    }),

    // updateBuyer: Joi.object().keys({
    //     id: Joi.number().required(),
    //     loanAppNo: Joi.number().required(),
    //     name: Joi.string().allow('').required(),
    //     roleId: Joi.number().required(),
    //     location: Joi.string().allow('').required()
    // }),


    id: Joi.object().keys({
        id: Joi.number().required(),
    }),



}