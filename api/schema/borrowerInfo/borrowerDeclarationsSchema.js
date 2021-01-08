'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //Borrower Declarations Question
    addQuestion: Joi.object().keys({
        sn: Joi.number().strict().required(),
        question: Joi.string().trim().required(),
        type: Joi.string().required(),
        status: Joi.string().required()
    }),
    
    updateQuestion: Joi.object().keys({
        id: Joi.number().strict().required(),
        sn: Joi.number().strict().required(),
        question: Joi.string().trim().required(),
        type: Joi.string().trim().required(),
        status: Joi.string().trim().required()
    }),
    getListQuestion: Joi.object().keys({
        id: Joi.number()
    }),

    deleteQuestion: Joi.object().keys({
        id: Joi.number().required()
    }),

    //Borrower Declarations Answer
    addAnswer: Joi.object().keys({
        borrowerInfoId: Joi.number().strict().required(),
        borrowerDeclarionQuestionId: Joi.number().strict().required(),
        answer: Joi.string().trim().required()
    }),

    updateAnswer: Joi.object().keys({
        id: Joi.number().strict().required(),
        borrowerInfoId: Joi.number().strict().required(),
        borrowerDeclarionQuestionId: Joi.number().strict().required(),
        answer: Joi.string().trim().required()
    }),

    getListAnswer: Joi.object().keys({
        id: Joi.number(),
        borrowerInfoId: Joi.number()
    }),

    deleteAnswer: Joi.object().keys({
        id: Joi.number().required()
    })
}