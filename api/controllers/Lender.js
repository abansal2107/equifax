'use strict'

const { check, validationResult } = require('express-validator');

const passport    = require('passport');
const jwt = require('jsonwebtoken');
// const models = require('../models/index')

var Lender = require('../models/Lender')

// var bcrypt = require('bcrypt');


exports.lenders = async function(req, res) {

    const errors = validationResult(req);  

    if (!errors.isEmpty()) {

        return res.status(422).json({ errors: errors.array() })
    }

    let perPage = 10;
    let skip = 0;
    let page = parseInt(req.query.page);
    if(page > 1){

        skip = parseInt(perPage * (page - 1));
    } 

    var lenders = await Lender.findAll({
    	
        attributes: [

            "id",
            "full_name",
            "location",
            "role",
            "email",
            "user_type",
            "country_code",
            "mobile_number",
            "status",
            "createdAt"
        ],

        limit: perPage, offset: skip
    });

    if(lenders.length > 0){

        res.status(200).json({success: true, data: lenders, message: 'Lenders found.'});

    }else{
        
        res.status(200).json({success: false, data: [], message: 'Lenders not found.'});
    }
}


// exports.addUser = async function(req, res){

//     const errors = validationResult(req);    
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() })
//     }
    
//     let user = {
//         full_name: req.query.full_name,
//         role: 1,
//         location: req.query.location,
//         country_code: req.query.country_code,
//         mobile_number: req.query.mobile_number,
//         email: req.query.email,
//         password: req.query.password,
//         status: 1,    
//         user_type: req.query.user_type,    
//     }

//     var check = await User.create(user);

//     if(check){
//         res.status(200).json({success: true, data: user, message: 'User added successfully.'});
//     }else{
//         res.status(200).json({success: false, data: [], message: 'Oops! Failed to add user.'});
//     }
// }

// exports.updateUser = async function(req, res){

//     const errors = validationResult(req);   

//     if (!errors.isEmpty()) {

//         return res.status(422).json({ errors: errors.array() })
//     }
    
//     let params = req.body;

//     let user = {

//         full_name: params.full_name,
//         role: params.role,
//         location: params.location,
//         country_code: params.country_code,
//         mobile_number: params.mobile_number,
//         email: params.email,
//         password: params.password,
//         status: 1,    
//         user_type: params.user_type,    
//     }

//     let where = {

//         id: params.id
//     }

//     var check = await User.update(user, {where: where});

//     if(check){

//         res.status(200).json({success: true, data: user, message: 'User added successfully.'});
//     }else{
//         res.status(200).json({success: false, data: [], message: 'Oops! Failed to add user.'});
//     }
// }