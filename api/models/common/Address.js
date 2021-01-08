

const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
var BorrowerAddress = require('../../models/borrowerInfo/BorrowerAddress')
var BorrowerInfo = require('../../models/borrowerInfo/BorrowerInfo')

module.exports = (sequelize, DataTypes) => {
const Address = sequelize.define('addresses', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
    {
        freezeTableName: true
    },
    {
    }
);

Address.associate = (models) => {
    // Address.belongsTo(models.borrower_addresses)
    Address.belongsToMany(models.borrower_info, {
        through: 'borrower_addresses',
        // as: 'address',
        // foreignKey: 'addressId'
      });

      Address.belongsToMany(models.borrower_info, {
        through: 'property_info',
        as:'propertyDetails'
        // as: 'address',
        // foreignKey: 'addressId'
      });
};
return Address
};