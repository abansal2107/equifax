'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    //Property and loan housing payment    
    addHousingPayment: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        firstMortgage: Joi.number().required(),
        subordinate: Joi.number().required(),
        homeOwnersInsurance: Joi.number().required(),       
        supplementalPropertyInsurance: Joi.number().required(),       
        propertyTaxes: Joi.number().required(),       
        mortagageInsurance: Joi.number().required(),       
        associationDues: Joi.number().required(),       
        other: Joi.number()      
    }),

    updateHousingPayment: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        firstMortgage: Joi.number(),
        subordinate: Joi.number(),
        homeOwnersInsurance: Joi.number(),       
        supplementalPropertyInsurance: Joi.number(),       
        propertyTaxes: Joi.number(),       
        mortagageInsurance: Joi.number(),       
        associationDues: Joi.number(),       
        other: Joi.number()
    }),

    getListHousingPayment: Joi.object().keys({
        borrowerInfoId: Joi.number(),
        id: Joi.number(),
    }),

    deleteHousingPayment: Joi.object().keys({
        id: Joi.number().required() 
    })

}