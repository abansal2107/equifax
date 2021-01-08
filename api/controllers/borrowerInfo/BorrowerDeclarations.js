'use strict'

const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const model = require('../../models');
const BorrowerInfo = model.borrower_info;
const BorrowerDeclarationsQuestion = model.borrower_declarations_questions;
const BorrowerDeclarationsAnswer = model.borrower_declarations_answers;
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');

const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Borrower Declarations Question
exports.addUpdateQuestion = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            sn: params.sn,
            question: params.question,
            type: params.type,
            status: params.status
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await BorrowerDeclarationsQuestion.findOne({ where: where });
        }

        let result;
        if (check) {
            result = await BorrowerDeclarationsQuestion.update(ReqData, { where: where });
        } else {
            result = await BorrowerDeclarationsQuestion.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Declarations question updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(UPDATE).json({ success: false, data: result, message: 'Declarations question not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Declarations question not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Declarations question added successfuly.'
            });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}


exports.listQuestion = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        let result = await BorrowerDeclarationsQuestion.findAll({ where: params.id ? where : '' });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Declarations question found.' });

        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Declarations question not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.deleteQuestion = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        let result = await BorrowerDeclarationsQuestion.destroy({ where: where });

        if (result === 1) {
            res.status(DELETE).json({ success: true, data: result, message: 'Question deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Question not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//ADD AND UPDATE Borrower Declarations Answer
exports.addUpdateAnswer = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            borrowerDeclarionQuestionId: params.borrowerDeclarionQuestionId,
            answer: params.answer
        }

        let checkInfo;
        checkInfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkInfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to add the answers!.' });
        checkInfo = await BorrowerDeclarationsQuestion.findOne({ where: { id: params.borrowerDeclarionQuestionId } });
        if (!checkInfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'The answers do not belong to the question!.' });

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await BorrowerDeclarationsAnswer.findOne({ where: where });
        }

        let result;
        if (check) {
            result = await BorrowerDeclarationsAnswer.update(ReqData, { where: where });
        } else {
            result = await BorrowerDeclarationsAnswer.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Declarations answer updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: true, data: result, message: 'Declarations answer not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Declarations answer not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Declarations answer added successfuly.'
            });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.listAnswer = async function (req, res) {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        let result = await BorrowerDeclarationsAnswer.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Declarations answer found.' });

        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Declarations answer not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.deleteAnswer = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await BorrowerDeclarationsAnswer.destroy({ where: where });

        if (result === 1) {
            res.status(DELETE).json({ success: true, data: result, message: 'Answer deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Answer not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}