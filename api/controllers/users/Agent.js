'use strict'
const models = require('../../models/index')
const Agent = models.agents
const { Op } = require("sequelize");
const errorHandler = require('../../../exceptions/error')

const constants = require('../../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    NOT_MODIFIED,
    DELETE } = constants.HTTP_STATUS

exports.agents = async function(req, res) {
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

    var agents = await Agent.findAndCountAll({
        where: { firstName: { [Op.like]: search } },
        limit: perPage, offset: skip
    });
    console.log('agents: ', agents);
    console.log('agents: ', agents.dataValues);
    console.log('agents: ', agents.length);

    if(agents.rows.length > 0){
        res.status(OK).json({success: true, data: agents.rows,count: agents.count, message: 'agents found.'});
    }else{
        res.status(OK).json({success: false, data: [],count:0, message: 'agents not found.'});
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


exports.addAgent = async function(req, res) {
    try {
        let body = req.body;
        var check = await Agent.create(body);
        if(check) {
            res.status(INSERT).json({
                success: true, data: body, message: 'Agent added successfully.'
            });
        }else{
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add agent.'
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

exports.agentDetail = async function(req, res) {
try {
    let params = req.query;
    var check = await Agent.findOne({
        where: {
            id: params.id
        },
    });

    if (check === null) {
        res.status(OK).json({success: false, data: null, message: 'Agent not found.'});
    }else{
        res.status(OK).json({success: true, data: check.dataValues, message: 'Agent detail found.'});
    } 
} catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message
    });   
}

  
}

exports.updateAgent = async function(req, res){
    try {
    let body = req.body;
    console.log('body',body)
    let where = {
        id: body.id
    }

    var check = await Agent.update(body, {where: where});
    console.log('check',check)

    if(check) {
        res.status(UPDATE).json({success: true, data: body, message: 'Agent updated successfully.'});
    } else {
        res.status(NOT_MODIFIED).json({success: false, data: [], message: 'Oops! Failed to update agent.'});
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

exports.delete = async function(req, res) {
    try {
        let params = req.query;
        var check = await Agent.findOne({
            where: {
                id: params.id
            },
        });
    
        if (check === null) {
            res.status(NOT_FOUND).json({success: false, data: null, message: 'Agent not found.'});
    
        }else{
            await Agent.destroy({ where: { id : params.id } });
            res.status(DELETE).json({success: true , message: 'Agent deleted successfully.'});
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
          message: error.message
        });  
    }

}
