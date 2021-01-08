'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    //Property and loan Answer    
    addPropertyAndLoanAnswer: Joi.object().keys({
        propertyInfoId: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        questionId: Joi.number().strict().required(),
        answer: Joi.string().trim().required()       
    }),

    updatePropertyAndLoanAnswer: Joi.object().keys({
        id: Joi.number().required(),
        propertyInfoId: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        questionId: Joi.number().strict().required(),
        answer: Joi.string().trim().required()
    }),

    getListPropertyAndLoanAnswer: Joi.object().keys({
        propertyInfoId: Joi.number(),
        id: Joi.number(),
    }),

    deletePropertyAndLoanAnswer: Joi.object().keys({
        id: Joi.number().required() 
    })

}