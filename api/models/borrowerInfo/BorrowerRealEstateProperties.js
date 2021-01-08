const {
    DataTypes
} = require('sequelize');
// var borrowerRealState = require('../borrowerInfo/borrowerRealState')
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const BorrowerRealEstateProperties = sequelize.define('borrower_reale_state_properties', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    borrowerinfoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    propertyValue: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('sold', 'pendingSale', 'Retained'),
        allowNull: false
    },
    intendedOccupancy: {
        type: DataTypes.ENUM('investment', 'primaryResidence', 'secondHome', 'other'),
        allowNull: false
    },
    monthlyInsuranceTaxesAssoc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monthlyRentalIncome: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    netMonthlyRentalIncome: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
}, {
    timestamps: true,
    freezeTableName: true
}, {});

BorrowerRealEstateProperties.associate = (models) => {
  BorrowerRealEstateProperties.belongsTo(models.borrower_info, {
    foreignKey: 'borrowerinfoId',
    // as: 'BorrowerRealEstate'
})
};
return BorrowerRealEstateProperties
};
