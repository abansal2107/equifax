'use strict';
const Joi = require('@hapi/joi');
const { PROPERTY_QUESTION_CATEGORY } = require('../../../config/strings/constant');
module.exports = {
    //Property and loan question    
    addPropertyAndLoanQuestion: Joi.object().keys({
        propertyInfoId: Joi.number().strict().required(),
        question: Joi.string().trim().required(),
        inputType: Joi.string().valid(['radio', 'check', 'text']).required(),
        type: Joi.string().valid(['L1', 'L2', 'L3']).required(),
        questionCategoryId: Joi.number().strict().required()        
    }),

    updatePropertyAndLoanQuestion: Joi.object().keys({
        id: Joi.number().required(),
        propertyInfoId: Joi.number().strict(),
        question: Joi.string().strict(),
        inputType: Joi.string().valid(['radio', 'check', 'text']),
        type: Joi.string().valid(['L1', 'L2' ,'L3']),
        questionCategoryId: Joi.number().strict()
    }),

    getListPropertyAndLoanQuestion: Joi.object().keys({
        propertyInfoId: Joi.number(),
        id: Joi.number(),
    }),

    deletePropertyAndLoanQuestion: Joi.object().keys({
        id: Joi.number().required()
    })

}