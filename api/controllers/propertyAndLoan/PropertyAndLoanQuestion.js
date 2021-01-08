'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const PropertyAndLoanQuestion = model.property_and_loan_question;
const LoanQuestionCategory = model.loan_question_category;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Property and Loan Question
exports.addupdate = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            propertyInfoId: params.propertyInfoId,
            question: params.question,
            inputType: params.inputType,
            type: params.type,
            questionCategoryId: params.questionCategoryId
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await PropertyAndLoanQuestion.findOne({ where: where });
            if (!check) return res.status(NOT_FOUND).json({ success: false, data: [], message: 'Question not found.' });

        }

        let result;
        if (check) {
            result = await PropertyAndLoanQuestion.update(ReqData, { where: where });
        } else {
            result = await PropertyAndLoanQuestion.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Question updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Question not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Question not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Question added successfuly.'
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

exports.list = async (req, res) => {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;
        
        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ propertyInfoId: params.propertyInfoId ? params.propertyInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };

        let result = await PropertyAndLoanQuestion.findAll({ 
            where: find, 
            include: [
                { model: LoanQuestionCategory }
            ],
    
    });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Question found.' });
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

exports.delete = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await PropertyAndLoanQuestion.destroy({ where: where });

        if (result) {
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

