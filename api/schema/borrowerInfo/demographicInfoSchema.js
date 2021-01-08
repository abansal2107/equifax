'use strict';
const Joi = require('@hapi/joi');
module.exports = {
    //Borrower Declarations Question
    addDemographic: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        ethnicity: Joi.string().valid(['1', '2', '3']).required(),
        hispanicorLatino: Joi.string().trim().required(),
        sex: Joi.string().trim().required(),
        race: Joi.string().trim().required(),
        asian: Joi.string().trim().required(),
        nativeHawaiianOrAlaskaNative: Joi.string().trim().required()
    }),

    updateDemographic: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        ethnicity: Joi.string().valid(['1', '2', '3']).required(),
        hispanicorLatino: Joi.string().trim().required(),
        sex: Joi.string().trim().required(),
        race: Joi.string().trim().required(),
        asian: Joi.string().trim().required(),
        nativeHawaiianOrAlaskaNative: Joi.string().trim().required()
    }),

    getListDemographic: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number(),
    }),

    deleteDemographic: Joi.object().keys({
        id: Joi.number().required()
    })
}
