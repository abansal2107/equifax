'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const sequelize = require('../../db/connection');

let db = {};
// borrower info
fs.readdirSync(`${__dirname}/borrowerInfo`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/borrowerInfo`, file));
        db[model.name] = model;
    });


//loan team
fs.readdirSync(`${__dirname}/loanTeam`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/loanTeam`, file));
        db[model.name] = model;
    });

// common
fs.readdirSync(`${__dirname}/common`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/common`, file));
        db[model.name] = model;
    });


// role
fs.readdirSync(`${__dirname}/role`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/role`, file));
        db[model.name] = model;
    });

// user
fs.readdirSync(`${__dirname}/user`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/user`, file));
        db[model.name] = model;
    });

   // Property And Loan
fs.readdirSync(`${__dirname}/propertyAndLoan`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/propertyAndLoan`, file));
        db[model.name] = model;
    });

    //loanTracking
    fs.readdirSync(`${__dirname}/loanTracking`)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        let model = sequelize['import'](path.join(`${__dirname}/loanTracking`, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// console.log('db',db)
db.sequelize = sequelize;
module.exports = db;