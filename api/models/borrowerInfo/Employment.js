const { DataTypes } = require('sequelize');

const sequelize = require('../../../db/connection');

var EmpMonthlyGrossIncome = require('../../models/borrowerInfo/EmpMonthlyGrossIncome');

var Addresses = require('../../models/common/Address');
module.exports = (sequelize, DataTypes) => {
    const BorrowerEmployments = sequelize.define('borrower_employments', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        loanAppNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employerName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        howLongWork: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        incomeType: {
            type: DataTypes.JSON,
            allowNull: true
        },
        q1: {
            type: DataTypes.ENUM('1', '2'),
        },
        q2: {
            type: DataTypes.ENUM('1', '2'),
        },
        monthlyIncome: {

            type: DataTypes.STRING,
            allowNull: true

        },
        type: {
            type: DataTypes.ENUM('1', '2'),
        }
    },
        {
            timestamps: true,
            freezeTableName: true
        },
        {
        }
    );
    BorrowerEmployments.associate = (models) => {
        BorrowerEmployments.hasOne(models.borrower_emp_monthly_gross_income)

        BorrowerEmployments.belongsTo(models.addresses, { foreignKey: 'addressId', as: 'address' })
    };
    return BorrowerEmployments
};
// BorrowerEmployments.hasOne(EmpMonthlyGrossIncome)

// BorrowerEmployments.belongsTo(Addresses, { foreignKey: 'addressId', as: 'address' })

// module.exports = BorrowerEmployments;