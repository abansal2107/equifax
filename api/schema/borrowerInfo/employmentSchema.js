'use strict';
'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //employement
    createEmployement: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
        employerName: Joi.string().trim(),
        phone: Joi.string().trim(),
        street: Joi.string().trim(),
        unit: Joi.string().trim(),
        country: Joi.string().trim(),
        state: Joi.string().trim(),
        city: Joi.string().trim(),
        position: Joi.string().trim(),
        zip: Joi.string().trim(),
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso(),
        howLongWork: Joi.number().strict(),
        incomeType: Joi.string().trim(),
        q1: Joi.string().valid(['1', '2']),
        q2: Joi.string().valid(['1', '2']),
        monthlyIncome: Joi.string().trim(),
        type: Joi.string().valid(['1', '2']),
        base: Joi.number().strict(),
        overtime: Joi.number().strict(),
        bonus: Joi.number().strict(),
        commission: Joi.number().strict(),
        militaryEntitlements: Joi.number().strict(),
        other: Joi.number().strict(),
        total: Joi.number().strict(),
    }),
    updateEmployement: Joi.object().keys({
        id: Joi.number().strict().required(),
        loanAppNo: Joi.string().trim().required(),
        employerName: Joi.string().trim(),
        phone: Joi.string().trim(),
        street: Joi.string().trim(),
        unit: Joi.string().trim(),
        country: Joi.string().trim(),
        state: Joi.string().trim(),
        city: Joi.string().trim(),
        position: Joi.string().trim(),
        zip: Joi.string().trim(),
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso(),
        howLongWork: Joi.number().strict(),
        incomeType: Joi.string().trim(),
        q1: Joi.string().valid(['1', '2']),
        q2: Joi.string().valid(['1', '2']),
        monthlyIncome: Joi.string().trim(),
        type: Joi.string().valid(['1', '2']),
        base: Joi.number().strict(),
        overtime: Joi.number().strict(),
        bonus: Joi.number().strict(),
        commission: Joi.number().strict(),
        militaryEntitlements: Joi.number().strict(),
        other: Joi.number().strict(),
        total: Joi.number().strict(),
    }),
    getEmployementDetail: Joi.object().keys({
        id: Joi.number(),
        loanAppNo: Joi.string().trim()
    }),
    getEmployementList: Joi.object().keys({
        id: Joi.number(),
        loanAppNo: Joi.string().trim()
    }),
    deleteEmployement: Joi.object().keys({
        loanAppNo: Joi.string().trim().required(),
        id: Joi.number().required()
    })
}