const { Op } = require("sequelize");
const { isEmpty } = require('../../util/isEmpty');
const sequelize = require('../../../db/connection')
const model = require('../../models');
const Addresses = model.addresses;
const BorrowerEmployments = model.borrower_employments;
const EmpMonthlyGrossIncome = model.borrower_emp_monthly_gross_income;
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')

const { BAD_REQUEST, NOT_FOUND, OK, INSERT, UPDATE, DELETE } = constants.HTTP_STATUS
//ADD
exports.add = async function (req, res, next) {
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
            loanAppNo: params.loanAppNo,
            employerName: params.employerName,
            phone: params.phone,
            addressId: addressId,
            position: params.position,
            startDate: params.startDate,
            endDate: params.endDate,
            howLongWork: params.howLongWork,
            incomeType: params.incomeType,
            q1: params.q1,
            q2: params.q2,
            monthlyIncome: params.monthlyIncome,
            type: params.type,
        }
        let borrowerEmploymentsData = await BorrowerEmployments.create(ReqData, { transaction: t });

        let employmentId = borrowerEmploymentsData.id;
        let empMonthlyGrossIncomeData;
        if (params.type == '1') {

            let empMonthlyGrossIncome = {
                borrowerEmploymentId: employmentId,
                base: params.base,
                overtime: params.overtime,
                bonus: params.bonus,
                commission: params.commission,
                militaryEntitlements: params.militaryEntitlements,
                other: params.other,
                total: params.total,
            }

            empMonthlyGrossIncomeData = await EmpMonthlyGrossIncome.create(empMonthlyGrossIncome, { transaction: t });

        }
        let borrowerEmployments = borrowerEmploymentsData ? borrowerEmploymentsData.dataValues : '';
        let result = {
            ...borrowerEmployments,
            address: addressData ? addressData.dataValues : '',
            borrowerempmonthlygrossincome: empMonthlyGrossIncomeData ? empMonthlyGrossIncomeData.dataValues : ''
        };

        if (borrowerEmploymentsData) {
            res.status(INSERT).json({
                success: true, data: result, message: 'Borrower Employment added successfully.'
            });
        } else {
            res.status(BAD_REQUEST).json({
                success: false, data: [], message: 'Oops! Failed to add Borrower Employment.'
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

//Detail Employment

exports.detail = async function (req, res, next) {

    const t = await sequelize.transaction();
    try {
        let params = req.query;
        let find = { id: params.id };
        var result = await BorrowerEmployments.findAll({ where: params.id ? find : '',
            include: [{
                model: EmpMonthlyGrossIncome
            }, {
                model: Addresses,
                as: 'address'
            }],
        }
            //, { transaction: t }
        );
        if (result === null) {
            res.status(NOT_FOUND).json({ success: false, data: null, message: 'Borrower Employment not found.' });
        } else {
            res.status(OK).json({ success: true, data: result, message: 'Borrower Employment detail found.' });
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
        var result = await BorrowerEmployments.findOne({

            where: {
                id: params.id
            },
        }, { transaction: t });

        var addressId = result.addressId;

        var result = await Addresses.findOne({

            where: {
                id: addressId
            },
        }, { transaction: t });

        var result = await EmpMonthlyGrossIncome.findOne({
            where: {
                borrowerEmploymentId: params.id
            },
        }, { transaction: t });

        if (result === null) {
            res.status(NOT_FOUND).json({ success: false, data: null, message: 'Employment not found.' });
        } else {
            await BorrowerEmployments.destroy({ where: { loanAppNo: params.loanAppNo } }, { transaction: t });
            await EmpMonthlyGrossIncome.destroy({ where: { borrowerEmploymentId: params.id } }, { transaction: t });
            await Addresses.destroy({ where: { id: addressId } }, { transaction: t });
            res.status(DELETE).json({ success: true, message: 'Employment deleted successfully.' });
        }
    } catch (error) {
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

        var resultOther = await BorrowerEmployments.findOne({
            where: {
                id: params.id
            },
        }, { transaction: t });
        let addressId = resultOther.dataValues.addressId;

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
            loanAppNo: params.loanAppNo,
            employerName: params.employerName,
            phone: params.phone,
            addressId: addressId,
            position: params.position,
            startDate: params.startDate,
            endDate: params.endDate,
            howLongWork: params.howLongWork,
            incomeType: params.incomeType,
            q1: params.q1,
            q2: params.q2,
            monthlyIncome: params.monthlyIncome,
            type: params.type,
        }

        let where = {
            id: params.id,
            loanAppNo: resultOther.dataValues.loanAppNo
        }

        let borrowerEmploymentsData = await BorrowerEmployments.update(ReqData, { where: where }, { transaction: t });
        let borrowerEmploymentId = params.id;
        let empMonthlyGrossIncomeData;
        if (params.type == '1') {

            let empMonthlyGrossIncome = {
                base: params.base,
                overtime: params.overtime,
                bonus: params.bonus,
                commission: params.commission,
                militaryEntitlements: params.militaryEntitlements,
                other: params.other,
                total: params.total,
            }
            empMonthlyGrossIncomeData = await EmpMonthlyGrossIncome.update(empMonthlyGrossIncome, { where: { borrowerEmploymentId: borrowerEmploymentId }, }, { transaction: t });
        }
        let result = {
            employment: borrowerEmploymentsData,
            address: addressData,
            borrowerempmonthlygrossincome: empMonthlyGrossIncomeData
        };

        if (borrowerEmploymentsData[0] === 1 || addressData[0] === 1 || empMonthlyGrossIncomeData[0] === 1) {
            res.status(UPDATE).json({ success: true, data: result, message: 'Employment updated successfully.' });

        } else {
            res.status(BAD_REQUEST).json({ success: false, data: [], message: 'Oops! Failed to update Employment.' });
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
            [objLength > 1 ? Op.and : Op.or]: [{ loanAppNo: params.loanAppNo ? params.loanAppNo : 0 },
            { id: params.id ? params.id : 0 }
            ]
        };
        let options = {

            attributes: ['id', 'loanAppNo', 'addressId', 'employerName', 'phone', 'monthlyIncome', 'type', 'howLongWork']
        }
        let data = await BorrowerEmployments.findAll({
            //options,
            where: find,
            include: [{
                model: EmpMonthlyGrossIncome,
            }, {
                model: Addresses,
                as: 'address',
            }],
        });

        if (data.length > 0) {
            res.status(OK).json({
                success: true, data: data, message: 'Borrower Employment info found.'
            });
        } else {
            res.status(NOT_FOUND).json({
                success: false, data: [], message: 'Oops! Borrower Employment info not found.'
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