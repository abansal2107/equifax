'use strict'

const { Op } = require("sequelize");
const sequelize = require('../../../db/connection');
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
//Models
const model = require('../../models');
const Sales = model.sales;
const Users = model.users;
const Locations = model.locations;
const Roles = model.roles;

const {BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS

exports.salesList = async function (req, res, next) {
    try {
        let params = req.query
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let where={}
        let include=[]
        if(params.loanAppNo){
            where ={
                loanAppNo:params.loanAppNo
            }
            include= [
                {model: Users,as: 'primaryMlos'},
                {model: Users,as: 'cooperatingMlos'},
                {model: Users,as: 'mloas'},
                {model: Locations,as: 'primaryMloLocation'},
                {model: Locations,as: 'cooperatingMloLocation'},
                {model: Locations, as: 'mloaLocation'},
             ]
        }
  

        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }

        var dataValues = await Sales.findAll({
            where:where,
            include:include,
            limit: perPage, offset: skip
        });

        if (dataValues.length > 0) {
            res.status(OK).json({ success: true, data: dataValues, message: 'Sales found.' });
        } else {
            res.status(NOT_FOUND).json({ success: false, data: [], message: 'Sales  not found.' });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.addSales = async function (req, res, next) {

    try {
        let body = req.body;
   
        var result = await Sales.create(body);

        if (result) {
            res.status(INSERT).json({
                success: true, data: result, message: 'Sellers Team added successfully.'
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

exports.updateSales = async function (req, res, next) {

    try {
        let body = req.body;
        let where = { id: body.id }

        var result = await Sales.update(req.body, { where: where });
        if (result[0] === 1) {
            res.status(UPDATE).json({
                success: true, data: req.body, message: 'Sales updated successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to update Sales.'
            });
        }
    } catch (error) {
        console.log('error',error)

        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}


