'use strict'

const models = require('../models/index')
const Vendor = models.vendors
const errorHandler = require('../../exceptions/error')
const helper = require('../util/helper')
const constant = require('../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE,
    NOT_MODIFIED,
    UNAUTHORIZED,
    SERVICE_UNAVAILABLE
} = constant.HTTP_STATUS
// var bcrypt = require('bcrypt');
const {
    Op
} = require("sequelize");

exports.vendors = async function (req, res) {
    try {
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let search = '%%';

        if (req.query.search) {
            search = '%' + req.query.search + '%';
        }

        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }

        var vendor = await Vendor.findAndCountAll({
            where: {
                [Op.or]: [{
                        company: {
                            [Op.like]: search
                        }
                    },
                    {
                        contact: {
                            [Op.like]: search
                        }
                    },
                    {
                        email: {
                            [Op.like]: search
                        }
                    },
                    {
                        phone: {
                            [Op.like]: search
                        }
                    },
                ],
                isDeleted:0
            },
            limit: perPage,
            offset: skip
        });

        if (vendor.rows.length > 0) {
            res.status(OK).json({
                success: true,
                data: vendor.rows,
                count: vendor.count,
                message: 'Vendor found.'
            });
        } else {
            res.status(OK).json({
                success: false,
                data: [],
                count: 0,
                message: 'Vendors not found.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }


}

exports.addVendor = async function (req, res) {
    try {
        let body = req.body;
        let newName = (/^.{0,3}/i).exec(body.name)
        let newAccountId = helper.randomString(6)
        let newUserId = helper.randomString(6)
        body.accountId = `${newName}${newAccountId}`
        body.userId = `${newName}${newUserId}`
        body.password = helper.passwordGenerator()

        var check = await Vendor.create(body);

        if (check) {
            res.status(INSERT).json({
                success: true,
                data: body,
                message: 'Vendor added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false,
                data: [],
                message: 'Oops! Failed to add Vendor.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.vendorDetail = async function (req, res) {
    try {
        let params = req.query;
        var check = await Vendor.findOne({
            where: {
                id: params.id,
                isDeleted:0
            },
        });

        if (check === null) {
            res.status(OK).json({
                success: false,
                data: null,
                message: 'Vendor not found.'
            });
        } else {
            res.status(OK).json({
                success: true,
                data: check.dataValues,
                message: 'Vendor detail found.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }


}

exports.updateVendor = async function (req, res) {
    try {
        let body = req.body;
        let where = {
            id: body.id,
            isDeleted:0
        }
        var check = await Vendor.update(body, {
            where: where
        });

        if (check) {
            res.status(UPDATE).json({
                success: true,
                data: body,
                message: 'Vendor updated successfully.'
            });
        } else {
            res.status(NOT_MODIFIED).json({
                success: false,
                data: [],
                message: 'Oops! Failed to update Vendor.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }

}

exports.delete = async function (req, res) {
    try {
        let params = req.query;
        var check = await Vendor.findAll({
            where: {
                id: params.id,
                isDeleted: 0
            },
        });
        let deleted = {
            isDeleted: 1
        }
        if ((check.length > 0)) {
            await Vendor.update(deleted, {
                where: {
                    id: params.id,
                    isDeleted: 0
                }
            });
            res.status(OK).json({
                success: true,
                message: 'Vendor deleted successfully.'
            });
        } else {
            res.status(NOT_FOUND).json({
                success: true,
                message: 'Vendor not found.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}