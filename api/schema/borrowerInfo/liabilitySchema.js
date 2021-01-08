'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //Borrower Liability
    addLiability: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        accountType: Joi.string().trim(),
        companyName: Joi.string().trim(),
        accountNumber: Joi.string().trim(),
        unpaidBalance: Joi.string().trim(),
        toBePaidOff: Joi.string().valid('0', '1'),
        monthlyPayment: Joi.string().trim()
    }),
    updateLiability: Joi.object().keys({
        id: Joi.number().strict().required(),
        accountType: Joi.string().trim(),
        companyName: Joi.string().trim(),
        accountNumber: Joi.string().trim(),
        unpaidBalance: Joi.string().trim(),
        toBePaidOff: Joi.string().valid('0', '1'),
        monthlyPayment: Joi.string().trim()
    }),
    getListLiability: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number(),
    }),
    deleteLiability: Joi.object().keys({
        id: Joi.number().required(),
    }),

    //Borrower Other Liability
    addOtherLiability: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        type: Joi.string().trim(),
        monthlyPayment: Joi.string().trim(),
    }),
    updateOtherLiability: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        type: Joi.string().trim(),
        monthlyPayment: Joi.string().trim(),
    }),
    getListOtherLiability: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number(),
    }),
    deleteOtherLiability: Joi.object().keys({
        id: Joi.number().required(),
    }),
}