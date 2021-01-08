'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const PropertyLoan = model.property_loans;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Borrower Property loan
exports.addupdate = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            propertyInfoId: params.propertyInfoId,
            loanAmount: params.loanAmount,
            loanPurpose: params.loanPurpose
        }

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await PropertyLoan.findOne({ where: where });
        }

        let result;
        if (check) {
            result = await PropertyLoan.update(ReqData, { where: where });
        } else {
            result = await PropertyLoan.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Property loan updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Property loan not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Property loan not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Property loan added successfuly.'
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

        let result = await PropertyLoan.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Property loan found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Property loan not found.' });
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
        var result = await PropertyLoan.destroy({ where: where });

        if (result) {
            res.status(DELETE).json({ success: true, data: result, message: 'Property loan deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Property loan not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

