const { DataTypes } = require('sequelize');

const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const Liability = sequelize.define('borrower_liabilities', {

    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
    borrowerInfoId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accountType : {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    unpaidBalance:{
        type: DataTypes.STRING,
        allowNull: true
    },
    toBePaidOff: {
        type: DataTypes.ENUM(['0','1']),
        allowNull: true
    },
    monthlyPayment: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    { 
        timestamps: true,
        freezeTableName: true
    },
    {
    }
);
return Liability
};
// module.exports = Liability;