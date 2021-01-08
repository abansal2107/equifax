'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const { result, validationResult } = require('express-validator');
const sequelize = require('sequelize')
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')

//Models
const model = require('../../models');
const LiabilityModel = model.borrower_liabilities;
const OtherLiabilityModel = model.borrower_liabilities_other;

const { BAD_REQUEST, NOT_FOUND, NOT_MODIFIED, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

exports.add = async function (req, res, next) {
  
    try {

        let params = req.body;
        let libility = {
            borrowerInfoId: params.borrowerInfoId,
            accountType: params.accountType,
            companyName: params.companyName,
            accountNumber: params.accountNumber,
            unpaidBalance: params.unpaidBalance,
            toBePaidOff: params.toBePaidOff,
            monthlyPayment: params.monthlyPayment,
        }

        let result = await LiabilityModel.create(libility);

        if (result) {
            res.status(INSERT).json({
                success: true, data: result, message: 'Borrower liability info added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add Borrower liability info.'
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

exports.update = async function (req, res, next) {

    try {
        let params = req.body;

        let libility = {
            accountType: params.accountType,
            companyName: params.companyName,
            accountNumber: params.accountNumber,
            unpaidBalance: params.unpaidBalance,
            toBePaidOff: params.toBePaidOff,
            monthlyPayment: params.monthlyPayment,
        }

        let options = {
            where: {
                id: params.id,
                borrowerInfoId: params.borrowerInfoId
            }
        }

        let result = await LiabilityModel.update(libility, options);

        if (result[0]===1) {
            res.status(UPDATE).json({
                success: true, data: result, message: 'Borrower liability info updated successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to update Borrower liability info.'
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


exports.delete = async function (req, res, next) {

    try {
        let params = req.query;

        let options = {
            where: {
                id: params.id,
                borrowerInfoId: params.borrowerInfoId
            }
        }

        let result = await LiabilityModel.destroy(options);

        if (result === 1) {
            res.status(DELETE).json({
                success: true, data: params.body, message: 'Borrower liability info deleted successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to delete Borrower liability info.'
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

exports.list = async function (req, res, next) {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        let options = {
            where: find,
            attributes: ['id', 'borrowerInfoId', 'accountType', 'companyName', 'accountNumber', 'unpaidBalance', 'toBePaidOff', 'monthlyPayment']
        }

        let result = await LiabilityModel.findAll(options);

        if (result.length > 0) {
            res.status(OK).json({
                success: true, data: result, message: 'Borrower liability info found.'
            });
        } else {
            res.status(NOT_FOUND).json({
                success: false, data: [], message: 'Oops! Borrower liability info not found.'
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

exports.addOtherLiability = async function (req, res, next) {

    try {
        let params = req.body;

        let libility = {
            borrowerInfoId: params.borrowerInfoId,
            type: params.type,
            monthlyPayment: params.monthlyPayment
        }
        
        let result = await OtherLiabilityModel.create(libility);

        if (result) {
            res.status(INSERT).json({
                success: true, data: result, message: 'Borrower other liability info added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add Borrower other liability info.'
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

exports.updateOtherLiability = async function (req, res, next) {

    try {
        let params = req.body;

        let libility = {
            type: params.type,
            monthlyPayment: params.monthlyPayment
        }

        let options = {
            where: {
                id: params.id,
                borrowerInfoId: params.borrowerInfoId
            },
            
        }
       
        let result = await OtherLiabilityModel.update(libility, options);

        if (result[0] === 1) {
            res.status(UPDATE).json({
                success: true, data: result, message: 'Borrower liability info updated successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, message: 'Oops! Failed to update Borrower liability info.'
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

exports.listOtherLiability = async function (req, res, next) {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };

        let data = await OtherLiabilityModel.findAll({ where: find });

        if (data.length > 0) {
            res.status(OK).json({
                success: true, data: data, message: 'Borrower other liability info found.'
            });
        } else {
            res.status(NOT_FOUND).json({
                success: false, message: 'Oops! Borrower other liability info not found.'
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

exports.deleteOtherLiability = async function (req, res, next) {

    try {
        let params = req.query;
        let options = {
            where: {
                id: params.id,
                borrowerInfoId: params.borrowerInfoId
            }
        }

        let result = await OtherLiabilityModel.destroy(options);
        if (result === 1) {
            res.status(DELETE).json({
                success: true, data: result, message: 'Borrower other liability info deleted successfully.'
            });
        } else {
            res.status(NOT_FOUND).json({
                success: false, message: 'Oops! Failed to delete Borrower other liability info.'
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


