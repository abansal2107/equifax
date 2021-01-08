'use strict'

const { check, validationResult } = require('express-validator');

const models = require('../../models/index')
const User = models.users
const CooperatingMLO = models.cooperating_mlo

const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE
} = constants.HTTP_STATUS

exports.get = async function(req, res, next) { 
    var params = req.query;
    try {        
        var dataValue = await CooperatingMLO.findAll({
            where: {
                loanAppNo: params.loanAppNo
            },
            attributes: ['userId']    
        });
        
        if(dataValue.length > 0) {
            let userIds = [];
            dataValue.map(function(item){
                userIds.push(item.userId);
            })

            let users = await User.findAll({
                where: {id: userIds},
                attributes: [
                    'id', 'full_name', 'email', 'role_category_id', 'mobile_number'
                ]
            })
            res.status(OK).json({success: true, data: users, message: 'Cooperating mlo found'});
        }else{
            res.status(OK).json({success: false, message: 'Cooperating mlo not found'});
        }        
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.add = async function(req, res, next) {
    try {
        let params = req.body;

        let ReqData = {
            loanAppNo:params.loanAppNo,
            userId:params.userId,
        }
        
        let checkExists = await CooperatingMLO.findOne({
            where: ReqData
        });
        
        if(checkExists != null){
            res.status(422).json({
                success: false, message: 'This user is already added for this loan application.'
            });
        }else{
            var check = await CooperatingMLO.create(ReqData);
            if(check) {
                res.status(INSERT).json({
                    success: true, data: ReqData, message: 'Cooperating MLO added successfully.'
                });
            } else {
                res.status(INSERT).json({
                    success: false, message: 'Oops! Failed to add MLO.'
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

exports.update = async function(req, res){
try {
    let params = req.body;

    let ReqData = {
        userId:params.userId,
        loanAppNo:params.loanAppNo,
    };

    let where = { id: params.id};
    var check = await CooperatingMLO.update(ReqData, {where: where});
    
    if(check[0]) {
        res.status(UPDATE).json({success: true, data: ReqData, message: 'Cooperating MLO updated successfully.'});
    } else {
        res.status(UPDATE).json({success: false, message: 'Oops! Failed to update Cooperating MLO.'});
    } 
} catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
        message: error.message
    });
}

}

exports.delete = async function(req, res) {
try {
    let params = req.query;

    var check = await CooperatingMLO.findAll({
        where: {
            id: params.id
        },
    });

    if ((check.length > 0) ) {
        await CooperatingMLO.destroy({ where: { id : params.id } });
        res.status(200).json({success: true, message: 'Cooperating MLO deleted successfully.'});
    }else{
        res.status(200).json({success: true, message: 'Cooperating MLO not found.'});
    } 
} catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
        message: error.message
    });  
}
 
}
