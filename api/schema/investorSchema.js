'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    getInvestors: Joi.object().keys({
        page: Joi.number().required()

    }),
    id: Joi.object().keys({
        id: Joi.number().required()

    }),
    addInvestor: Joi.object().keys({
        name: Joi.string().trim().required(),
        alias: Joi.string().trim(),
        address: Joi.string().trim().required(),
        phone: Joi.number().required(),
        website: Joi.string().trim().required(),
        FHASponsorshipId: Joi.number().min(100000000).max(9999999999),
        VASponsorshipId: Joi.number().min(10000000).max(99999999999),
        executiveName: Joi.string().trim().required(),
        executivePhone: Joi.number().required(),
        executiveEmail: Joi.string().trim().required(),

    }),
    updateInvestor: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().trim().required(),
        alias: Joi.string().trim(),
        address: Joi.string().trim().required(),
        phone: Joi.number().required(),
        website: Joi.string().trim().required(),
        FHASponsorshipId: Joi.number().min(100000000).max(9999999999),
        VASponsorshipId: Joi.number().min(10000000).max(99999999999),
        executiveName: Joi.string().trim().required(),
        executivePhone: Joi.number().required(),
        executiveEmail: Joi.string().trim().required(),

    }),
    addMortgageClause: Joi.object().keys({
        investorId: Joi.number().required(),
        coverageType: Joi.number().required(),
        name: Joi.string().trim().required(),
        address: Joi.string().trim().required(),
        loanType: Joi.string().trim().required()

    }),

    editMortgageClause: Joi.object().keys({
        id: Joi.number().required(),
        investorId: Joi.number(),
        coverageType: Joi.number(),
        name: Joi.string().trim(),
        address: Joi.string().trim(),
        loanType: Joi.string().trim()

    }),



};