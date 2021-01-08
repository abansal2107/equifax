'use strict'

const passport = require('passport');
const joi = require('../schema/middleware');
const userSchema = require('../schema/userSchema');

module.exports = function (app) {

    //Controllers
    let UserController = require('../controllers/users/User')
    let ContentController = require('../controllers/Content')

    //Requests
    // let UserRequest = require('../../requests/users/UserRequest')

    //Set Routes
    app.route('/')
        .get(ContentController.base_url);

    app.route('/login')
        .post(joi.check(userSchema.login), UserController.login)

    // app.route('/login')
    //     .post(UserRequest.validate('login'), UserController.login)
}