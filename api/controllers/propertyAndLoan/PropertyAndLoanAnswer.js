'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const PropertyAndLoanAnswer = model.property_and_loan_answer;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Property and Loan Question
exports.addupdate = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            propertyInfoId: params.propertyInfoId,            
            borrowerInfoId: params.borrowerInfoId,
            questionId: params.questionId,
            answer: params.answer
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await PropertyAndLoanAnswer.findOne({ where: where });
            if(!check) return res.status(NOT_FOUND).json({ success: false, data:[], message: 'Answer not found.' });
        }

        let result;
        if (check) {
            result = await PropertyAndLoanAnswer.update(ReqData, { where: where });
        } else {
            result = await PropertyAndLoanAnswer.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Answer updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Answer not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Answer not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Answer added successfuly.'
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

        let result = await PropertyAndLoanAnswer.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Answer found.' });
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

exports.delete = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await PropertyAndLoanAnswer.destroy({ where: where });

        if (result) {
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

