'use strict'

const { Op } = require("sequelize");
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
//Models
const model = require('../../models');
const SellersAgent = model.sellers_agents;

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS


exports.list = async function (req, res) {

    try {

        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let params = req.query;

        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }

        var dataValue = await SellersAgent.findAll({
            where: {
                loanAppNo: params.loanAppNo
            },
            // limit: perPage, offset: skip
        });

        if (dataValue.length > 0) {
            res.status(OK).json({ success: true, data: dataValue, message: 'seller agents found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Seller agents not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.add = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            loanAppNo: params.loanAppNo,
            agentId: params.agentId,
        }

        var result = await SellersAgent.create(ReqData);

        if (result) {
            res.status(INSERT).json({
                success: true, data: result, message: 'Buyers agent added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add buyer agent.'
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
        let ReqData = {
            loanAppNo: params.loanAppNo,
            agentId: params.agentId,
        }
        let where = { id: params.id }
        var result = await SellersAgent.update(ReqData, { where: where });

        if ((result[0] === 1)) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Buyer agent updated successfully.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, message: 'Oops! Buyer agent not found.' });
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
        var result = await SellersAgent.findAll({
            where: {
                id: params.id
            },
        });

        if ((result.length > 0)) {
            await SellersAgent.destroy({ where: { id: params.id } });
            res.status(DELETE).json({ success: true, message: 'Buyers Agent deleted successfully.' });

        } else {
            res.status(NOT_FOUND).json({ success: true, message: 'Buyers Agent not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}
