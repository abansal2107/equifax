'use strict'

const { Op } = require("sequelize");
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
//Models
const model = require('../../models');
const SellersTeam = model.sellers_team;
const SellerAgent = model.agents;
const Users = model.users;

const {BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

exports.details = async function (req, res, next) {

    try {
        var dataValues = await SellersTeam.findAll({
            where: {
                loanAppNo: req.query.loanAppNo,
             
            },
            include: [
                {model: Users,as: 'salesAgents'},
                {model: Users,as: 'salesAgentAssistants'},
                {model: Users,as: 'salesTeams'}
            ]
        });

        if (dataValues.length > 0) {
            res.status(OK).json({ success: true, data: dataValues, message: 'Sellers Team found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Sellers Team not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.add = async function (req, res, next) {

    try {
        let body = req.body;
        var result = await SellersTeam.create(body);
        console.log('result',result)

        if (result) {
            res.status(INSERT).json({
                success: true, data: body, message: 'Sellers Team added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add Sellers Team.'
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

        let body = req.body;
   

        let where = { id: body.id,loanAppNo: body.loanAppNo }

        var result = await SellersTeam.update(body, { where: where });
        console.log('result',result)
        if (result[0]) {
            res.status(UPDATE).json({
                success: true, data: body, message: 'Sellers Team updated successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to update SellersTeam.'
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

        var result = await await SellersTeam.destroy({ where: { id: params.id } });

        if (result === 1) {
            res.status(DELETE).json({ success: true, message: 'Buyers Team deleted successfully.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: null, message: 'Buyers Team not found.' });
        }

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.sellersAgent = async function (req, res, next) {

    try {
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let search = '%%';

        if (req.query.search) {
            search = '%' + req.query.search + '%';
        }

        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }

        var dataValues = await SellerAgent.findAll({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: search } },
                    { lastName: { [Op.like]: search } },
                    { email: { [Op.like]: search } },
                    { phone: { [Op.like]: search } },
                ],
            },
            limit: perPage, offset: skip
        });

        if (dataValues.length > 0) {
            res.status(OK).json({ success: true, data: dataValues, message: 'Agents found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Agents not found.' });
        }
        next()
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}
