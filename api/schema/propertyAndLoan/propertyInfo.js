'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //PropertyInfo    
    addPropertyInfo: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        propertyValue: Joi.number().strict().required(),
        accupancy: Joi.string().valid(['primaryResidenc', 'secondHome', 'investmentProperty']).required(),
        q1: Joi.string().valid(['1', '2']),
        q2: Joi.string().valid(['1', '2']),
        expectedMonthalyRentalIncome: Joi.number().strict(),
        expectedNetMonthalyRentalIncome: Joi.number().strict(),
        street: Joi.string().trim(),
        unit: Joi.string().trim(),
        country: Joi.string().trim(),
        state: Joi.string().trim(),
        city: Joi.string().trim(),
        zip: Joi.string().trim(),
    }),

    updatePropertyInfo: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        propertyValue: Joi.number().strict(),
        accupancy: Joi.string().valid(['primaryResidenc', 'secondHome', 'investmentProperty']),
        q1: Joi.string().valid(['1', '2']),
        q2: Joi.string().valid(['1', '2']),
        expectedMonthalyRentalIncome: Joi.number().strict(),
        expectedNetMonthalyRentalIncome: Joi.number().strict(),
        street: Joi.string().trim(),
        unit: Joi.string().trim(),
        country: Joi.string().trim(),
        state: Joi.string().trim(),
        city: Joi.string().trim(),
        zip: Joi.string().trim(),
    }),

    getListPropertyInfo: Joi.object().keys({
        borrowerInfoId: Joi.number(),
        id: Joi.number()
    }),

    deletePropertyInfo: Joi.object().keys({
        id: Joi.number().required()
    })

}