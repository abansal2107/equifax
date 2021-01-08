'use strict'
const models = require('../../models/index')
const loanStatusUser = models.loan_status_user
const loanStatusMaster = models.loan_tracking_masters

console.log('loanStatusUser',loanStatusUser)

const {
    Op
} = require("sequelize");
const errorHandler = require('../../../exceptions/error')

const constants = require('../../../config/strings/constant')
const {BAD_REQUEST,NOT_FOUND,OK,INSERT,UPDATE,NOT_MODIFIED,DELETE} = constants.HTTP_STATUS


exports.loanStatusMaster = async function (req, res) {
    try {
        const result = await loanStatusMaster.findAll({})
        res.status(OK).json({
            success: true,
            data: result,
            message: ''
        });


    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }



}


exports.loanStatusUser = async function (req, res) {
    try {
        const result = await loanStatusUser.findAll({
            where:{
                loanAppId:req.query.id
            },
            raw:true
        })
        res.status(OK).json({
            success: true,
            data: result,
            message: ''
        });


    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.createStatusUser = async function (req, res) {
    try {
        let {body}=req
        const result = await loanStatusUser.create(body)
        console.log('result',result)
        res.status(INSERT).json({
            success: true,
            data: result,
            message: ''
        });


    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}
