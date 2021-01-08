'use strict'

var request = require('request');
var db = require('../../../db/connection')

var Content = function(contact){
    // this.type = contact.type;
    // this.title = contact.title;
    // this.value = contact.value;    
    // this.created_at = new Date();
}

Content.all = function(params){
        
    return new Promise(function(resolve, reject){

        let sql = "SELECT title,type,value FROM contents WHERE 1";

        db.query(sql, function (err, result) {            
    
            if(err) {
                console.log("error: ", err);
                reject({result: err});                        
            }
            else{
                
                resolve(result);                        
            }
        });
    })
}

Content.getData = function(types){
    
    return new Promise(function(resolve, reject){

        let sql = `SELECT title,type,value FROM contents WHERE type IN(`+types+`)`;
        console.log(sql)
        db.query(sql, function (err, result) {            
    
            if(err) {
                console.log("error: ", err);
                reject({result: err});                        
            }
            else{
                
                resolve(result);                        
            }
        });
    })
}

Content.userLastOpenApp = function(params){
        
    return new Promise(function(resolve, reject){
        
        let last_open = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        
        let sql = `INSERT INTO user_statistics (user_id, last_open) VALUES (`+params.user_id+`,'`+last_open+`') ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), last_open = VALUES(last_open)`;

        db.query(sql, function (err, result) {            
    
            if(err) {
                console.log("error: ", err);
                reject({result: err});                        
            }
            else{
                //console.log(result);
                resolve(true);                        
            }
        });
    })
}

Content.userLastModified = function(params){
        
    return new Promise(function(resolve, reject){
        
        let last_modified = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(params)
        let sql = `INSERT INTO user_statistics (user_id, last_modified) VALUES (`+params.user_id+`,'`+last_modified+`') ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), last_modified = VALUES(last_modified)`;

        db.query(sql, function (err, result) {            
    
            if(err) {
                console.log("error: ", err);
                reject({result: err});                        
            }
            else{
                //console.log(result);
                resolve(true);                        
            }
        });
    })
}

Content.clickOnBusiness = function(params){
        
    return new Promise(function(resolve, reject){
        
        let click_on_business = 1;
        
        let sql = `INSERT INTO user_statistics (user_id, click_on_business) VALUES (`+params.user_id+`,'`+click_on_business+`') ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), click_on_business = click_on_business + VALUES(click_on_business)`;                

        db.query(sql, function (err, result) {            
    
            if(err) {
                console.log("error: ", err);
                reject({result: err});                        
            }
            else{
                //console.log(result);
                resolve(true);                        
            }
        });
    })
}

module.exports = Content;
