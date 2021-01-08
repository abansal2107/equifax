'use strict'
const models = require('../models/index')
const States = models.states
console.log('States: ', States);
const errorHandler = require('../../exceptions/error')
const constants = require('../../config/strings/constant')

const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE } = constants.HTTP_STATUS
    
exports.getAllStates = async function (req, res) {
    try {
  
        var states = await States.findAndCountAll({});

        if (states.rows.length > 0) {
            res.status(OK).json({
                success: true,
                data: states.rows,
                count:states.count,
                message: 'States found.'
            });
        } else {

            res.status(OK).json({
                success: false,
                data: [],
                count:0,
                message: 'States not found.'
            });
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
