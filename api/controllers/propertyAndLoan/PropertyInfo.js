const sequelize = require('../../../db/connection')
const model = require('../../models');
const Addresses = model.addresses;
const PropertyInfo = model.property_info;
const PropertyLoan = model.property_loans;
const PropertyMortgageLoan = model.property_mortgage_loans;
const { isEmpty } = require('../../util/isEmpty');
const { Op } = require("sequelize");
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS
//ADD
exports.add = async function (req, res) {

    const t = await sequelize.transaction();
    try {
        let params = req.body;
        //Address
        let addressInsert = {
            street: params.street,
            unit: params.unit,
            country: params.country,
            state: params.state,
            city: params.city,
            zip: params.zip,
        }
        let addressData = await Addresses.create(addressInsert, { transaction: t });
        let addressId = addressData.id;

        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            propertyValue: params.propertyValue,
            accupancy: params.accupancy,
            addressId: addressId,
            q1: params.q1,
            q2: params.q2,
            expectedMonthalyRentalIncome: params.expectedMonthalyRentalIncome,
            expectedNetMonthalyRentalIncome: params.expectedNetMonthalyRentalIncome,
        }
        let propertyInfoData = await PropertyInfo.create(ReqData, { transaction: t });

        let propertyInfo = propertyInfoData ? propertyInfoData.dataValues : '';
        let result = {
            ...propertyInfo,
            address: addressData ? addressData.dataValues : '',
        };

        if (result) {
            res.status(INSERT).json({
                success: true, data: result, message: 'Property info added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add Property info.'
            });
        }
        await t.commit();

    } catch (error) {
        await t.rollback();
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}
//UPDATE
exports.update = async function (req, res) {

    const t = await sequelize.transaction();

    try {
        let params = req.body;

        var checkExist = await PropertyInfo.findOne({
            where: {
                id: params.id
            },
        }, { transaction: t });
        let addressId = checkExist.dataValues.addressId;

        //Address
        let addressUpdate = {

            street: params.street,
            unit: params.unit,
            country: params.country,
            state: params.state,
            city: params.city,
            zip: params.zip,
        }

        let addressData = await Addresses.update(addressUpdate, { where: { id: addressId }, }, { transaction: t });

        let ReqData = {
            borrowerInfoId: params.borrowerInfoId,
            propertyValue: params.propertyValue,
            accupancy: params.accupancy,
            addressId: addressId,
            q1: params.q1,
            q2: params.q2,
            expectedMonthalyRentalIncome: params.expectedMonthalyRentalIncome,
            expectedNetMonthalyRentalIncome: params.expectedNetMonthalyRentalIncome,
        }

        let where = {
            id: params.id
        }

        let propertyInfoData = await PropertyInfo.update(ReqData, { where: where }, { transaction: t });

        let result = {
            propertyInfo: propertyInfoData,
            address: addressData
        };

        if (propertyInfoData[0] || addressData[0]) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Property info updated successfully.' });

        } else {
            res.status(BAD_REQUEST).json({ success: false, data: [], message: 'Oops! Failed to update property info.' });
        }

    } catch (error) {
        t.rollback();
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.list = async function (req, res, next) {

    const t = await sequelize.transaction();

    try {

        let params = req.query;
        let objLength = Object.keys(params).length;

        let find = isEmpty(params) ? '' : {
            [objLength > 1 ? Op.and : Op.or]: [{ borrowerInfoId: params.borrowerInfoId ? params.borrowerInfoId : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        let data = await PropertyInfo.findAll({
            where: find,
            include: [
                { model: Addresses },
                { model: PropertyLoan },
                { model: PropertyMortgageLoan }
            ],
        });

        if (data.length > 0) {
            res.status(OK).json({
                success: true, data: data, message: 'Property info found.'
            });
        } else {
            res.status(NOT_FOUND).json({
                success: false, data: [], message: 'Oops! Property info not found.'
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

//DELETE
exports.delete = async function (req, res) {

    const t = await sequelize.transaction();
    try {
        let params = req.query;
        var PropertyInforesult = await PropertyInfo.findOne({ where: { id: params.id } }, { transaction: t });
        if (!PropertyInforesult) return res.status(NOT_FOUND).json({ success: false, data: null, message: 'Property info not found.' });

        var addressId = PropertyInforesult.dataValues.addressId;

        var result = await Addresses.findOne({ where: { id: addressId } });

        if (PropertyInforesult === null) {
            res.status(NOT_FOUND).json({ success: false, data: null, message: 'Property info not found.' });
        } else {
            await PropertyInfo.destroy({ where: { id: params.id } }, { transaction: t });
            await Addresses.destroy({ where: { id: addressId } }, { transaction: t });
            res.status(DELETE).json({ success: true, message: 'Property info deleted successfully.' });
        }
        t.commit();
    } catch (error) {
        t.rollback();
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

