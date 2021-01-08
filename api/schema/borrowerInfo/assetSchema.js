'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //ASSET
    createAsset: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        accountType: Joi.string(),
        financialInstitution: Joi.string().trim(),
        accountNumber: Joi.string().trim(),
        cashOrMarketValue: Joi.string().trim().max(200)
    }),
    updateAsset: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        accountType: Joi.string(),
        financialInstitution: Joi.string().trim(),
        accountNumber: Joi.string().trim(),
        cashOrMarketValue: Joi.string().trim().max(200)
    }),
    getListAsset: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number()
    }),
    deleteAsset: Joi.object().keys({
        id: Joi.number().required()
    }),

    //Other Asset or credit
    createOtherAsset: Joi.object().keys({
        borrowerInfoId: Joi.number().strict(),
        assetsOrCreditType: Joi.string(),
        cashOrMarketValue: Joi.string().trim().max(200)
    }),
    updateOtherAsset: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict(),
        assetsOrCreditType: Joi.string().trim(),
        cashOrMarketValue: Joi.string().trim().max(200)
    }),
    getListOtherAsset: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number()
    }),
    deleteOtherAsset: Joi.object().keys({
        id: Joi.number().required()
    }),

    // SUB HEADER:  Gifts & Grants

    createGiftsOrGrant: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        assetType: Joi.string().trim(),
        isDeposited: Joi.string().valid(['0', '1']).optional(),
        source: Joi.string().trim(),
        cashOrMarketValue: Joi.string().trim().max(200),
    }),
    updateGiftsOrGrant: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        assetType: Joi.string().trim(),
        isDeposited: Joi.string().valid(['0', '1']),
        source: Joi.string().trim(),
        cashOrMarketValue: Joi.string().trim().max(200),
    }),
    getListGiftsOrGrant: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number()
    }),
    deleteGiftsOrGrant: Joi.object().keys({
        id: Joi.number().required()
    }),

}