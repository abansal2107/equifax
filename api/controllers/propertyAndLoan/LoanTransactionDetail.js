'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const { object } = require("@hapi/joi");
const LoanTransactionDetail = model.loan_transaction_detail;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Loan Transaction Detail
exports.addupdate = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            salseContract: params.salseContract,
            improvements: params.improvements,
            land: params.land,
            forRefinance: params.forRefinance,
            creditCardsAndOther: params.creditCardsAndOther,
            borrowerClosingCosts: params.borrowerClosingCosts,
            discountPoints: params.discountPoints,
            loanAmount: params.loanAmount,
            OtherNewMoergage: params.OtherNewMoergage,
            sellerCredits: params.sellerCredits,
            OtherCredits: params.OtherCredits
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await LoanTransactionDetail.findOne({ where: where });
            if (!check) return res.status(NOT_FOUND).json({ success: false, data: [], message: 'Transaction Detail not found.' });

        }

        let result;
        if (check) {
            result = await LoanTransactionDetail.update(ReqData, { where: where });
        } else {
            result = await LoanTransactionDetail.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Transaction Detail updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Transaction Detail not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Transaction Detail not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Transaction Detail added successfuly.'
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
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };

        let result = await LoanTransactionDetail.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Transaction Detail found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Transaction Detail not found.' });
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
        var result = await LoanTransactionDetail.destroy({ where: where });

        if (result) {
            res.status(DELETE).json({ success: true, data: result, message: 'Transaction Detail deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Transaction Detail not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

