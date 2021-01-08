'use strict';
const Joi = require('@hapi/joi');
const { MILITARY_STATUS } = require('../../../config/strings/constant');

module.exports = {
    //Borrower Military services    
    addMilitary: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        militaryService: Joi.string().valid(['Yes','No']).required(),
        militaryStatus: Joi.string().valid(MILITARY_STATUS).required()
    }),

    updateMilitary: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        militaryService: Joi.string().valid(['Yes','No']).required(),
        militaryStatus: Joi.string().valid(MILITARY_STATUS).required()
    }),

    getListMilitary: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number()
    }),

    deleteMilitary: Joi.object().keys({
        id: Joi.number().required()
    })
    
}