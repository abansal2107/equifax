"use strict";

const passport = require("passport");
const joi = require("../schema/middleware");
module.exports = function(app) {
    //Controllers
    let EquifaxController = require("../controllers/creditScore/equifax");

    const EquifaxSchema = require("../schema/creditScore/equifax");
    app.route("/submit-credit-score").post(
        // passport.authenticate('jwt', {session: false}),
        // joi.check(EquifaxSchema.submitRequest),
        EquifaxController.submitScore
    );

    app.route("/joint-submit-credit-score").post(
        // passport.authenticate('jwt', {session: false}),
        // joi.check(EquifaxSchema.submitRequest),
        EquifaxController.jointSubmitScore
    );

    app.route("/pre-close-submit").post(
        // passport.authenticate('jwt', {session: false}),
        // joi.check(EquifaxSchema.submitRequest),
        EquifaxController.preCloseSubmit
    );

    app.route("/single-upgrade-add").post(
        // passport.authenticate('jwt', {session: false}),
        // joi.check(EquifaxSchema.submitRequest),
        EquifaxController.singleUpgradeAdd
    );

    app.route("/echl-update").post(
        // passport.authenticate('jwt', {session: false}),
        // joi.check(EquifaxSchema.submitRequest),
        EquifaxController.echlUpdate
    );

    // app.route('/single-update')
    //     .post(
    //         // passport.authenticate('jwt', {session: false}),
    //         // joi.check(EquifaxSchema.submitRequest),
    //         EquifaxController.singleUpdate);
};