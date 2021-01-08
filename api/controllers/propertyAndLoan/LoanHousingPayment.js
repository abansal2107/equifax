'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const LoanHousingPayment = model.loan_housing_payment;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Loan Housing Payment
exports.addupdate = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            firstMortgage: params.firstMortgage,
            subordinate: params.subordinate,
            homeOwnersInsurance: params.homeOwnersInsurance,
            supplementalPropertyInsurance: params.supplementalPropertyInsurance,
            propertyTaxes: params.propertyTaxes,
            mortagageInsurance: params.mortagageInsurance,
            associationDues: params.associationDues,
            other: params.other
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await LoanHousingPayment.findOne({ where: where });
            if (!check) return res.status(NOT_FOUND).json({ success: false, data: [], message: 'Housing Payment not found.' });

        }

        let result;
        if (check) {
            result = await LoanHousingPayment.update(ReqData, { where: where });
        } else {
            result = await LoanHousingPayment.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Housing Payment updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Housing Payment not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Housing Payment not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Housing Payment added successfuly.'
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
        let perPage = 20;
        let page = parseInt(req.query.page);
        let skip = page > 1 ? parseInt(perPage * (page - 1)) : 0;
        
        let params = req.query;
        
        params.page && delete params.page;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };

        let result = await LoanHousingPayment.findAll({ where: find, limit: perPage, offset: skip });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Housing Payment found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Housing Payment not found.' });
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
        var result = await LoanHousingPayment.destroy({ where: where });

        if (result) {
            res.status(DELETE).json({ success: true, data: result, message: 'Housing Payment deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Housing Payment not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

