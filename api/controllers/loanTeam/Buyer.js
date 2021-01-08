'use strict'

const { check, validationResult } = require('express-validator');
const errorHandler = require('../../../exceptions/error')
const models = require ('../../models/index')
const Agents =models.agents
const BuyersTeam =models.buyers_team
const BuyerAgentAssistants =models.buyer_agent_assistants 
const BuyersAgent=models.buyers_agents
const Users=models.users
const Locations=models.locations

const constants = require('../../../config/strings/constant')
const {BAD_REQUEST,NOT_FOUND,OK,INSERT,UPDATE,DELETE } = constants.HTTP_STATUS

const { Op } = require("sequelize");

exports.details = async function(req, res, next) {
    try {
        var dataValues = await BuyersTeam.findAll({
            where: { 
                loanAppNo: req.query.loanAppNo,
            },
            include:[
                {model: Users,as: 'buyerAgents'},
                {model: Users,as: 'buyerAgentAssistants'},
                {model: Users,as: 'buyerAgentTeams'},
                {model: Locations,as: 'buyerAgentLocations'},
                {model: Locations,as: 'buyerAgentAssistantLocations'},
                {model: Locations, as: 'buyerAgentTeamLocations'},
            ]
        });

        if(dataValues.length > 0){
            res.status(OK).json({success: true, data: dataValues, message: 'Buyer Team found.'});
        }else{
            res.status(OK).json({success: false, data: [], message: 'Buyer Team not found.'});
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
        let body = req.body;
        var check = await BuyersTeam.create(body);
        
        if(check) {
            res.status(INSERT).json({
                success: true, data: body, message: 'Buyers Team added successfully.'
            });
        } else {
            res.status(INSERT).json({
                success: false, data: [], message: 'Oops! Failed to add BuyersTeam.'
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

exports.update = async function(req, res, next) {
    try {
        let body = req.body;

        let where = { id: body.id ,loanAppNo:body.loanAppNo}

        var check = await BuyersTeam.update(body, {where: where}); 
        console.log('check',check)

        if(check[0]) {
            res.status(UPDATE).json({
                success: true, data: body, message: 'Buyers Team updated successfully.'
            });
        } else {
            res.status(UPDATE).json({
                success: false, data: [], message: 'Oops! Failed to update BuyersTeam.'
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



exports.delete = async function(req, res, next) {
    try {
        let params = req.query;
        var check = await BuyersTeam.findOne({
            where: {
                id: params.id
            },
        });
        if (check === null) {
            res.status(DELETE).json({success: false, data: null, message: 'Buyers Team not found.'});
        }else{
            await BuyersTeam.destroy({ where: { id : params.id } });
            res.status(DELETE).json({success: true , message: 'Buyers Team deleted successfully.'});
        }

    } catch (error) { 
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        }); 
    }   
}

exports.buyersAgent = async function(req, res, next) {
     try {

        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let search = '%%';
        
        if (req.query.search) {
            search = '%' + req.query.search + '%';
        }

        if(page > 1) {
            skip = parseInt(perPage * (page - 1));
        } 
        let params = req.query;
        var dataValues = await BuyersAgent.findAll({
            where: {
                loanAppNo: params.loanAppNo
            },
            include: [{
              model: Agents,
                as: 'agents',
                required:true,
                where: { 
                  [Op.or]: [
                    { firstName: { [Op.like]: search } }, 
                    { lastName: { [Op.like]: search } },
                    { email: { [Op.like]: search } }, 
                    { phone: { [Op.like]: search } },
                  ],      
                },
            }],    
            limit: perPage, offset: skip
        });

        if(dataValues.length > 0) {
            res.status(OK).json({success: true, data: dataValues, message: 'Agents found.'});
        } else {        
            res.status(OK).json({success: false, data: [], message: 'Agents not found.'});
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }   
}
