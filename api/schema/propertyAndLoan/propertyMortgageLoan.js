'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //PropertyLoan    
    addPropertyMortgageLoan: Joi.object().keys({
        propertyInfoId: Joi.number().strict().required(),
        creditorName: Joi.string().trim(),
        lienType: Joi.string().valid(['firstLien','subordinateLien']),
        monthalyPayment: Joi.number().strict(),
        loanOrToBedrawnAmount: Joi.number().strict(),
        creditLimit: Joi.number().strict()        
        
    }),

    updatePropertyMortgageLoan: Joi.object().keys({
        id: Joi.number().strict().required(),
        propertyInfoId: Joi.number().strict().required(),
        creditorName: Joi.string().trim(),
        lienType: Joi.string().valid(['firstLien','subordinateLien']),
        monthalyPayment: Joi.number().strict(),
        loanOrToBedrawnAmount: Joi.number().strict(),
        creditLimit: Joi.number().strict()
    }),

    getListPropertyMortgageLoan: Joi.object().keys({
        propertyInfoId: Joi.number(),
        id: Joi.number()
    }),

    deletePropertyMortgageLoan: Joi.object().keys({
        id: Joi.number().required()
    })

}