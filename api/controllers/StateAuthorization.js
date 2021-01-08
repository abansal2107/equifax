'use strict' 

const { check, validationResult } = require('express-validator');
var StateAuthorization = require('../models/user/StateAuthorization');

exports.updateState = async function(params){    
                
    await StateAuthorization.create(params);
    
}