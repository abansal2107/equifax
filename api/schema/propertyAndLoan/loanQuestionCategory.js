'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    //Property and loan Answer    
    addQuestionCategory: Joi.object().keys({
        categoryName: Joi.string().trim().required(),
        isActive: Joi.boolean().required()       
    }),

    updateQuestionCategory: Joi.object().keys({
        id: Joi.number().strict().required(),
        categoryName: Joi.string().trim().required(),
        isActive: Joi.boolean().required()  
    }),

    getListQuestionCategory: Joi.object().keys({
        id: Joi.number(),
    }),

    deleteQuestionCategory: Joi.object().keys({
        id: Joi.number().required() 
    })

}