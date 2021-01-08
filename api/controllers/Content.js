'use strict' 

const { check, validationResult } = require('express-validator');
var Content = require('../models/other/Content');


exports.base_url = async function(req, res){    
    
    let data = {
        'base-url': req.headers.host,
        'contents': 'pankaj'
    }
    

    res.send({success: true, result: data});
}
