'use strict'
const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const DemographicInfo = model.borrower_demographic_info;
const BorrowerInfo = model.borrower_info;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Borrower Demographic info
exports.addUpdateDemographicInfo = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            ethnicity: params.ethnicity,
            hispanicorLatino: params.hispanicorLatino,
            sex: params.sex,
            race: params.race,
            asian: params.asian,
            nativeHawaiianOrAlaskaNative: params.nativeHawaiianOrAlaskaNative
        }
        
        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await DemographicInfo.findOne({ where: where });
        }

        let result;
        if (check) {
            result = await DemographicInfo.update(ReqData, { where: where });
        } else {
            result = await DemographicInfo.create(ReqData);
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Demographic info updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: false, data: result, message: 'Demographic info not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Demographic info not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Demographic info added successfuly.'
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

exports.listDemographicInfo = async (req, res) => {

    try {
        let params = req.query;

        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };

        let result = await DemographicInfo.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Demographic info found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Demographic info not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.deleteDemographicInfo = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await DemographicInfo.destroy({ where: where });

        if (result === 1) {
            res.status(DELETE).json({ success: true, data: result, message: 'Demographic info deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Demographic info not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}