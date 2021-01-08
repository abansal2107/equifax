'use strict'

const { Op } = require("sequelize");
const Message = require('../../../config/strings/Message')

const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')

//Models
const model = require('../../models');
const User = model.users;
const PrimaryMLO = model.primary_mlo;

const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE } = constants.HTTP_STATUS

exports.add = async function (req, res, next) {

    try {
        let params = req.body;
        let ReqData = {
            loanAppNo: params.loanAppNo,
            userId: params.userId,
        }

        // Is primary mlo already added
        var checkExists = await PrimaryMLO.findOne({
            where: {
                loanAppNo: params.loanAppNo
            },
            attributes: ['id']
        })

        if (checkExists != null) {
            res.status(BAD_REQUEST).json({
                success: false, message: 'Primary mlo already added for this loan application.'
            });
        } else {
            var result = await PrimaryMLO.create(ReqData);
            if (result) {
                res.status(INSERT).json({
                    success: true, data: result, message: Message.PRIMARYMLO_ADDED
                });
            } else {
                res.status(BAD_REQUEST).json({
                    success: false, data: [], message: MESSAGE.PRIMARYMLO_FAILED_TO_ADD
                });
            }
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
        let ReqData = {
            userId: params.userId
        }

        let where = { id: params.id, loanAppNo: params.loanAppNo }
        var result = await PrimaryMLO.update(ReqData, { where: where });

        if (result[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Primary MLO updated successfully.' });
        } else {
            res.status(BAD_REQUEST).json({ success: false, message: 'Oops! Failed to update Primary MLO.' });
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

    var params = req.query;

    try {
        var dataValue = await PrimaryMLO.findOne({
            where: { loanAppNo: params.loanAppNo },
            attributes :["id","loanAppNo"],
            include: [{
                model: User,
                as: 'users',
                attributes: [
                    'id', 'full_name', 'email', 'role_category_id', 'user_type', 'mobile_number'
                ]
            }]
        });

        if (dataValue.users != undefined) {
            res.status(OK).json({ success: true, data: dataValue, message: Message.PRIMARYMLO_FOUND });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: Message.PRIMARYMLO_NOT_FOUND });
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
        var result = await PrimaryMLO.destroy({ where: { id: params.id } });

        if (result) {
            res.status(DELETE).json({ success: true, message: 'Primary MLO deleted successfully.' });
        } else {
            res.status(BAD_REQUEST).json({ success: false, message: 'Oops! Failed to delete.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

