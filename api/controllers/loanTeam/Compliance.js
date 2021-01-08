'use strict'

const { check, validationResult } = require('express-validator');

// const Compliance = require('../../models/loanTeam/Compliance')
const models = require('../../models/index')
const Compliance =models.compliance
const User =models.users
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
const {BAD_REQUEST,NOT_FOUND,OK,INSERT,UPDATE,DELETE
} = constants.HTTP_STATUS
exports.list = async function(req, res, next){
    
    try {
        var params = req.query;
        var dataValue = await Compliance.findAll({
            where: {
                loanAppNo: params.loanAppNo
            },
            include:{model:User,as:'postClosingReviewers'},
     
        });
        if(dataValue.length > 0) {
            res.status(OK).json({success: true, data: dataValue, message: 'Compliance found'});
        }else{
            res.status(OK).json({success:false,message: 'Compliance not found'});
        }
    }catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        }); 
    }
}

exports.add = async function(req, res, next){
    let params = req.body;
    try {
        let compliance = {            
            postClosingReviewer: params.postClosingReviewer,
        }

        let checkExists = await Compliance.findOne({
            where: {loanAppNo: params.loanAppNo}
        })

        if(checkExists === null){
            compliance.loanAppNo = params.loanAppNo;            
            Compliance.create(compliance) 
        }else{
            Compliance.update(compliance, {
                where:{loanAppNo: params.loanAppNo}
            })  
        }
        res.status(200).json({success: true, message: 'Great! Compliance info updated successfully.'});

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.delete = async function(req ,res ){
try {
    let params = req.query
    var check = await Compliance.findAll({
        where: {
            id: params.id
        },
    });   
    if ((check.length > 0) ) {
        await Compliance.destroy({ where: { id : params.id}});
        res.status(200).json({success: true, message: 'Compliance Deleted Successfully......'})
    }else{
        res.status(200).json({success: true, message: 'Compliance not found'});
    }  
} catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
        message: error.message
    });
}
}

exports.update = async function(req,res){
    try {
        let params = req.body;
    
        let loan = {
    
            loanAppNo: params.loanAppNo,
            postClosingReviewer: params.postClosingReviewer,
        }
    
        let where = {
            id: params.id
        }
    
        var check = await Compliance.update(loan, {where: where});
    
        if(check){
    
            res.status(UPDATE).json({success: true, data: loan, message: 'Compliance added successfully.'});
        }else{
            res.status(UPDATE).json({success: false, data: [], message: 'Oops! Failed to add Compliance.'});
        }  
    } catch (error) {
        console.log('error: ', error);
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }

    
}