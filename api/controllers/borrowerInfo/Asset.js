'use strict'

const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const model = require('../../models');
const Asset = model.borrower_emp_assets;
const AssetsCreditsOther = model.borrower_emp_assets_credits_other;
const AssetsGiftsOrGrant = model.borrower_emp_assets_gifts_or_grants;
const BorrowerInfo = model.borrower_info;
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')

const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE } = constants.HTTP_STATUS

//ADD ASSETS
exports.addAsset = async function (req, res, next) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            accountType: params.accountType,
            financialInstitution: params.financialInstitution,
            accountNumber: params.accountNumber,
            cashOrMarketValue: params.cashOrMarketValue
        }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to add the assets info!.' });

        var result = await Asset.create(ReqData);

        if (result === null) {
            res.status(INSERT).json({ success: false, data: null, message: 'Asset not added.' });
        } else {
            res.status(INSERT).json({ success: true, data: result.dataValues, message: 'Asset added successfuly.' });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}
//UPDATE ASSETS
exports.updateAsset = async function (req, res, next) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            accountType: params.accountType,
            financialInstitution: params.financialInstitution,
            accountNumber: params.accountNumber,
            cashOrMarketValue: params.cashOrMarketValue
        }
        let where = { id: params.id }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to update the assets info!.' });

        var result = await Asset.update(ReqData, { where: where });
        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Asset updated successfuly.' });
        } else {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Asset not updated.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//LIST ASSETS
exports.listAsset = async function (req, res, next) {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        var result = await Asset.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Assets found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Assets not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//DELETE ASSET
exports.deleteAsset = async function (req, res, next) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await Asset.destroy({ where: where });
        if (result === 1) {
            res.status(DELETE).json({ success: true, data: [], message: 'Assets deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Assets not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

// END ASSET SECTION

//ADD Other Assets and Credits
exports.addOtherAsset = async function (req, res, next) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            assetsOrCreditType: params.assetsOrCreditType,
            cashOrMarketValue: params.cashOrMarketValue,
        }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to add the assets credit other info!.' });

        var result = await AssetsCreditsOther.create(ReqData);

        if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Other Asset Or Creadit not added.' });
        } else {
            res.status(INSERT).json({ success: true, data: result.dataValues, message: 'Other Asset Or Creadit added successfuly.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//UPDATE Other Assets and Credits
exports.updateOtherAsset = async function (req, res, next) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            assetsOrCreditType: params.assetsOrCreditType,
            cashOrMarketValue: params.cashOrMarketValue,
        }
        let where = { id: params.id }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to update the assets credit other info!.' });

        var result = await AssetsCreditsOther.update(ReqData, { where: where, raw: true });
        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Other Asset Or Credit updated successfuly.' });
        } else {
            res.status(BAD_REQUEST).json({ success: false, data: [], message: 'Other Asset Or Credit not updated.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//LIST Other Assets and Credits
exports.listOtherAsset = async function (req, res, next) {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        var result = await AssetsCreditsOther.findAll({ where: find });

        if (result.length > 0) {
            res.status(200).json({ success: true, data: result, message: 'Other Assets Or Credits found.' });
        } else {
            res.status(200).json({ success: false, data: [], message: 'Other Asset Or Credit not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

//DELETE Other Assets and Credits
exports.deleteOtherAsset = async function (req, res, next) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await AssetsCreditsOther.destroy({ where: where });
        console.log("deleteOtherAsset", result)
        if (result === 1) {
            res.status(DELETE).json({ success: true, data: [], message: 'deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Other Assets Or Credits not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

// SUB HEADER:  Gifts & Grants

exports.addGiftandGrants = async function (req, res, next) {

    try {
        let params = req.body;
        let insert = {
            borrowerInfoId: params.borrowerInfoId,
            assetType: params.assetType,
            isDeposited: params.isDeposited,
            source: params.source,
            cashOrMarketValue: params.cashOrMarketValue,
        }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to add the assets gift or grant info!.' });

        var result = await AssetsGiftsOrGrant.create(insert);

        if (result) {
            res.status(INSERT).json({ success: true, data: result, message: 'Assets gifts and grants are added successfully.' });
        } else {
            res.status(BAD_REQUEST).json({ success: false, data: [], message: 'Assets gifts and grants not added.' });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.updateGiftandGrants = async function (req, res, next) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            assetType: params.assetType,
            isDeposited: params.isDeposited,
            source: params.source,
            cashOrMarketValue: params.cashOrMarketValue,
        }
        let where = { id: params.id }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to update the assets gifts or grant info!.' });

        var result = await AssetsGiftsOrGrant.update(ReqData, { where: where });
        console.log('result: ', result);
        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Assets gifts and grants updated successfully.' });
        } else {
            res.status(BAD_REQUEST).json({ success: false, data: [], message: 'Assets gifts and grants not updated.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.listGiftandGrants = async function (req, res, next) {

    try {
        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        var result = await AssetsGiftsOrGrant.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Assets gifts and grants found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Assets gifts and grants not found.' });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.deleteGiftandGrants = async function (req, res, next) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await AssetsGiftsOrGrant.destroy({ where: where });
        if (result === 1) {
            res.status(DELETE).json({ success: true, data: [], message: 'deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Assets gifts and grants not found.' });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}