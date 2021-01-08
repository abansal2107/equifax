const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection')

module.exports = (sequelize, DataTypes) => {
const Vendor = sequelize.define('vendors', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
      },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountId:{
        type: DataTypes.STRING,
        allowNull: true  
    },
    userId:{
        type: DataTypes.STRING,
        allowNull: true  
    },

    password:{
        type: DataTypes.STRING,
        allowNull: true  
    },
    vendor_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_contacted: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isDeleted:{
        type: DataTypes.STRING,
        allowNull: true
    }
  },{ timestamps: false }, {
});

return Vendor
};
