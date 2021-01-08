'use strict' 
const models = require('../models/index')
const Investor = models.investors
const MortgageClause = models.mortgage_clause
const errorHandler = require('../../exceptions/error')
const { Op } = require("sequelize");

exports.investors = async function(req, res) {
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

    var investors = await Investor.findAndCountAll({
        where: { name: { [Op.like]: search } },
        
        include: [{
            model: MortgageClause,
            as: 'mortgage_clause',    
        }],
        
        limit: perPage, offset: skip
    });

    if(investors.rows.length > 0){
        res.status(200).json({success: true, data: investors.rows,count:investors.count, message: 'Investors found.'});

    }else{
        res.status(200).json({success: false, data: [], count:0 ,message: 'Investors not found.'});
    }
} catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message
    });
}
}

exports.addInvestor = async function(req, res) {

try {
    let params = req.body;

    let investor = {

        name: params.name,
        alias: params.alias,
        address: params.address,
        phone: params.phone,
        website: params.website, 
        fhasponsorshipId: params.FHASponsorshipId,
        vasponsorshipId: params.VASponsorshipId,
        executiveName: params.executiveName,
        executivePhone: params.executivePhone,
        executiveEmail: params.executiveEmail,
        isDeleted:0
    }

    var check = await Investor.create(investor);

    if(check) {

        res.status(200).json({

            success: true, data: investor, message: 'Investor added successfully.'
        });
        
    } else {

        res.status(200).json({

            success: false, data: [], message: 'Oops! Failed to add investor.'
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

exports.investorDetail = async function(req, res) {
    try {
        let params = req.query;
        var check = await Investor.findOne({
            where: {
                id: params.id
            },
        });
    
        if (check === null) {
            res.status(200).json({success: false, data: null, message: 'Investor not found.'});
        }else{
            res.status(200).json({success: true, data: check.dataValues, message: 'Investor detail found.'});
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
          message: error.message
        });  
    }

  

}

exports.updateInvestor = async function(req, res){
    try {
    let body = req.body;

    let where = {
        id: body.id
    }
    var check = await Investor.update(body, {where: where});
    if(check) {
        res.status(200).json({success: true, data: body , message: 'Investor updated successfully.'});
    } else {
        res.status(200).json({success: false, data: [], message: 'Oops! Failed to update investor.'});
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
        var check = await Investor.findOne({
            where: {
                id: params.id
            }
        });
        console.log('check: ', check);
        if (check == null) {
            let resp ={
                success: false, data: null, message: 'Investor not found.' 
            }
            res.status(200).json({success: false, data: null, message: 'Investor not found.'});
            res.status(204).json(resp)
            
        }else{
           await Investor.destroy({ where: { id : params.id } });
            res.status(200).json({success: true , message: 'Investor deleted successfully.'});
            console.log('res: ', res);
            console.log('-------------------------');

        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
          message: error.message
        });
    }
}

/*MortgageClause*/

exports.addMortgageClause =  async function(req, res) {
    try {
        let body = req.body;

    let dataValues = {
        investorId: body.investorId,
        coverageType: body.coverageType,
        name: body.name,
        address: body.address,
        loanType: body.loanType, 
    }

    var check = await MortgageClause.create(dataValues);

    if(check) {
        res.status(200).json({
            success: true, data: dataValues, message: 'Mortgage Clause added successfully.'
        });

    } else {
        res.status(200).json({
            success: false, data: [], message: 'Oops! Failed to add Mortgage Clause.'
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

exports.editMortgageClause =  async function(req, res) {
    try {
        let body = req.body;
        let where = {
            id: body.id
        }
        var check = await MortgageClause.update(body, {where: where});
        if(check) {
            res.status(200).json({success: true, data: body, message: 'Mortgage Clause updated successfully.'});
        } else {
            res.status(200).json({success: false, data: [], message: 'Oops! Failed to update investor.'});
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
          message: error.message
        });    
    }
}
