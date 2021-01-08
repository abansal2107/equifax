'use strict'

const passport = require('passport');
const joi = require('../schema/middleware');
module.exports = function (app) {

    //Controllers    
    let LoanTracking = require('../controllers/loanTracking/loanTracking')


    const LoanTrackingSchema = require('../schema/loanTracking/loanTracking')
    app.route('/loan-tracking-master')
        .get(
            // passport.authenticate('jwt', {session: false}),
            LoanTracking.loanStatusMaster);

    app.route('/loan-status-user')
    .post(
        // passport.authenticate('jwt', {session: false}),
        joi.check(LoanTrackingSchema.createStatusUser),
        LoanTracking.createStatusUser)
        .get(
            // passport.authenticate('jwt', {session: false}),
            LoanTracking.loanStatusUser);

}