'use strict';
const Joi = require('@hapi/joi'),
    util = require('util'),
    _ = require('lodash');
    const constants = require('../../config/strings/constant')
    const {
        BAD_REQUEST,
        NOT_FOUND,
        OK,
        INSERT,
        UPDATE,
        DELETE } = constants.HTTP_STATUS;
const BadRequestError = function (errors) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestError';
    this.message = 'Bad Request Error';
    this.errors = errors[0].message;
    this.status = BAD_REQUEST;
};

util.inherits(BadRequestError, Error);

const validate = (schema) => {
    return (req, res, next) => {
        let body = _.extend({}, req.body);
        if (req.method == 'GET' || req.method == 'DELETE') {
            body = _.extend({}, req.query);
        }
        
        Joi.validate(body, schema, {
            abortEarly: false,
            allowUnknown: true
        }, (err, schemaResult) => {
            if (err) {
                let details = [];
                err.details.forEach((d) => {
                    console.log('d: ', d);
                 if (d.message.indexOf('phone_number') == 1) {
                        details.push({
                            message: 'Enter valid phone number min or max 10 length',
                            path: d.path
                        });
                    } else {
                        details.push({
                            message: d.message.replace(/'/g, ''),
                            path: d.path
                        });
                    }
                });
                return next(new BadRequestError(details));
            }
            req.schema = schemaResult;
            return next();
        });
    }
};

module.exports = {
    check: validate,
    BadRequestError: BadRequestError
};