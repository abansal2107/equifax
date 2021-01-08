'use strict'

const {
    check,
    validationResult
} = require('express-validator');
const errorHandler = require('../../../exceptions/error')
const models = require('../../models/index')
const BuyersAgent = models.buyers_agents

const constants = require('../../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE
} = constants.HTTP_STATUS
exports.list = async function (req, res) {
    try {
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let params = req.query;
    
        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }
    
        var dataValue = await BuyersAgent.findAll({
            where: {
                loanAppNo: params.loanAppNo
            },
        });
    
        if (dataValue.length > 0) {
            res.status(OK).json({
                success: true,
                data: dataValue,
                message: 'buyer agents found.'
            });
        } else {
            res.status(OK).json({
                success: false,
                data: [],
                message: 'Buyer agents not found.'
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

exports.add = async function (req, res) {
    try {
        let params = req.body;
        let ReqData = {
            loanAppNo: params.loanAppNo,
            agentId: params.agentId,
        }
    
        var check = await BuyersAgent.create(ReqData);
    
        if (check) {
            res.status(INSERT).json({
                success: true,
                data: ReqData,
                message: 'Buyers agent added successfully.'
            });
        } else {
            res.status(INSERT).json({
                success: false,
                data: [],
                message: 'Oops! Failed to add buyer agent.'
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

exports.update = async function (req, res) {

    try {
        let params = req.body;
        let ReqData = {
            loanAppNo: params.loanAppNo,
            agentId: params.agentId,
        }
    
        let where = {
            id: params.id
        }
        var check = await BuyersAgent.update(ReqData, {
            where: where
        });
    
        if (check) {
            res.status(UPDATE).json({
                success: true,
                data: ReqData,
                message: 'Buyer agent updated successfully.'
            });
        } else {
            res.status(UPDATE).json({
                success: false,
                data: [],
                message: 'Oops! Failed to update buyer agent.'
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

exports.delete = async function (req, res) {
    try {
        let params = req.query;

        var check = await BuyersAgent.findAll({
            where: {
                id: params.id
            },
        });
    
        if ((check.length > 0)) {
            await BuyersAgent.destroy({
                where: {
                    id: params.id
                }
            });
            res.status(200).json({
                success: true,
                message: 'Buyers Agent deleted successfully.'
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Buyers Agent not found.'
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