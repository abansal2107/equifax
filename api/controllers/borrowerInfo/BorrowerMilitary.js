'use strict'

const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const errorHandler = require('../../../exceptions/error');
const constants = require('../../../config/strings/constant');
const model = require('../../models');
const BorrowerMilitary = model.borrower_military;
const BorrowerInfo = model.borrower_info;

const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE } = constants.HTTP_STATUS

//ADD AND UPDATE Borrower Demographic info
exports.addUpdateMilitary = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            militaryService: params.militaryService,
            militaryStatus: params.militaryStatus
        }

        let checkinfo = await BorrowerInfo.findOne({ where: { id: params.borrowerInfoId } });
        if (!checkinfo) return res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Borrower info does not exist to add the military info!.' });

        let check, where;
        if (params.id) {
            where = { id: params.id };
            check = await BorrowerMilitary.findOne({ where: where });
        }

        let result;
        if (check) {
            result = await BorrowerMilitary.update(ReqData, { where: where });
        } else {
            result = await BorrowerMilitary.create(ReqData);
            result.dataValues && delete result.dataValues.isDeleted;
        }

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Military info updated successfuly.' });
        }
        else if (result[0] === 0) {
            res.status(BAD_REQUEST).json({ success: true, data: result, message: 'Military info not updated.' });
        }
        else if (result === null) {
            res.status(BAD_REQUEST).json({ success: false, data: null, message: 'Military info not added.' });
        } else {
            res.status(INSERT).json({
                success: true, data: result.dataValues, message: 'Military info added successfuly.'
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

exports.listMilitary = async (req, res) => {

    try {
        let params = req.query;

        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };

        let result = await BorrowerMilitary.findAll({ where: find });

        if (result.length > 0) {
            res.status(OK).json({ success: true, data: result, message: 'Military info found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Military info not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.deleteMilitary = async function (req, res) {

    try {
        let params = req.query;
        let where = { id: params.id }
        var result = await BorrowerMilitary.destroy({ where: where });

        if (result === 1) {
            res.status(DELETE).json({ success: true, data: result, message: 'Military info deleted successfuly.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Military info not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}