'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    //Property and loan Transaction Detail    
    addTransactionDetail: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        salseContract: Joi.number(),
        improvements: Joi.number(),
        land: Joi.number(),       
        forRefinance: Joi.number(),       
        creditCardsAndOther: Joi.number(),       
        borrowerClosingCosts: Joi.number(),       
        discountPoints: Joi.number(),       
        loanAmount: Joi.number(),       
        OtherNewMoergage: Joi.number(),       
        sellerCredits: Joi.number(),       
        OtherCredits: Joi.number() 
    }),

    updateTransactionDetail: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        salseContract: Joi.number(),
        improvements: Joi.number(),
        land: Joi.number(),       
        forRefinance: Joi.number(),       
        creditCardsAndOther: Joi.number(),       
        borrowerClosingCosts: Joi.number(),       
        discountPoints: Joi.number(),       
        loanAmount: Joi.number(),       
        OtherNewMoergage: Joi.number(),       
        sellerCredits: Joi.number(),       
        OtherCredits: Joi.number()
    }),

    getListTransactionDetail: Joi.object().keys({
        borrowerInfoId: Joi.number(),
        id: Joi.number(),
    }),

    deleteTransactionDetail: Joi.object().keys({
        id: Joi.number().required() 
    })

}