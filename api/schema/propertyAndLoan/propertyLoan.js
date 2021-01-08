'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //PropertyLoan    
    addPropertyLoan: Joi.object().keys({
        propertyInfoId: Joi.number().strict().required(),
        loanAmount: Joi.number().strict().required(),
        loanPurpose: Joi.string().valid(['purchase','reference','construction']).required(),
        
    }),

    updatePropertyLoan: Joi.object().keys({
        id: Joi.number().strict().required(),
        propertyInfoId: Joi.number().strict().required(),
        loanAmount: Joi.number().strict().required(),
        loanPurpose: Joi.string().valid(['purchase','reference','construction']).required(),
    }),

    getListPropertyLoan: Joi.object().keys({
        id: Joi.number(),
        propertyInfoId: Joi.number()
    }),

    deletePropertyLoan: Joi.object().keys({
        id: Joi.number().required()
    })

}