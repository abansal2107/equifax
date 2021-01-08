'use strict'
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const LoanQuestionCategory = model.loan_question_category;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Question Category
exports.addupdate = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            categoryName: params.categoryName,
            isActive: params.isActive
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await LoanQuestionCategory.findOne({ where: where });
            if (!check) return res.status(NOT_FOUND).json({ success: false, data: [], message: 'Question category not found.' });
        }

        let result;
        if (check) {
            result = await LoanQuestionCategory.update(ReqData, { where: where });
        } else {
            result = await LoanQuestionCategory.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Question category updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Question category not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Question category not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Question category added successfuly.'
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
        let find = { id: params.id };

        let result = await LoanQuestionCategory.findAll({ where: params.id ? find : '' });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Question category found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Question category not found.' });
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
        var result = await LoanQuestionCategory.destroy({ where: where });

        if (result) {
            res.status(DELETE).json({ success: true, data: result, message: 'Question category deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Question category not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

