'use strict'

const { check, validationResult } = require('express-validator');

const models = require('../../models/index')
const Fullfillment = models.fullfillments
const Users = models.users

const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
const {BAD_REQUEST,NOT_FOUND,OK,INSERT,UPDATE,DELETE} = constants.HTTP_STATUS

exports.list = async function(req, res, next){
    var params = req.query;
    try {
        var dataValue = await Fullfillment.findAll({
            where: {
                loanAppNo: params.loanAppNo
            },
            include: [
                {model: Users,as: 'setupCordinators'},
                {model: Users,as: 'fullfillmentCordinators'},
                {model: Users,as: 'closingCordinators'},
             
             ],
            attributes: [
                'id',
                'loanAppNo',
                'setupCordinator',
                'fullfillmentCordinator',
                'closingCordinator',
                'createdAt'
            ]

        });
        if(dataValue.length > 0) {
            res.status(200).json({success: true, data: dataValue, message: 'Fulfillment found'});
        }else{
            res.status(200).json({sucee:false,message: 'Fulfillment not found'});
        }

     }catch (error) {
         console.log('error',error)
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
        
        let fullfillment = {            
            setupCordinator: params.setupCordinator,
            fullfillmentCordinator: params.fullfillmentCordinator,
            closingCordinator: params.closingCordinator,
        }

        let checkExists = await Fullfillment.findOne({
            where: {loanAppNo: params.loanAppNo}
        })

        if(checkExists != null){
            Fullfillment.update(fullfillment, {
                where:{loanAppNo: params.loanAppNo}
            })            
        }else{
            fullfillment.loanAppNo = params.loanAppNo;            
            Fullfillment.create(fullfillment)            
        }
        res.status(INSERT).json({success: true, message: 'Great! Fullfillment info added successfully.'});

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });  
    
    }
}

exports.update = async function(req ,res ,next){
    let params = req.body;
    console.log('params',params)

    try{

        let where = {id: params.id};
    console.log('where',where)

    console.log('+++++++++++++++++++++++++++++1')

        var check = await Fullfillment.update(params, {where: where});
    console.log('+++++++++++++++++++++++++++++2')

        console.log('check',check)
        if (check[0]) {
            res.status(UPDATE).json({success: true, data: params, message: 'Fullfillment Updated Successfully....'})
        }else{
            res.status(UPDATE).json({success: false,data:[], message: 'Oops! Failed to update Fullfillment'})
        }
    }catch(error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });  
    }
}

exports.delete = async function(req ,res ,next){
    try {
        let params = req.query
        var check = await Fullfillment.findAll({
            where: {
                id: params.id
            }
        });   
        if ((check.length > 0) ) {
            await Fullfillment.destroy({ where: { id : params.id}});
            res.status(DELETE).json({success: true, message: 'Fullfillment Deleted Successfully.'})
        }else{
            res.status(DELETE).json({success: true, message: 'Fullfillment not found'});
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });  
    }

}

