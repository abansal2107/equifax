const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');


module.exports = (sequelize, DataTypes) => {
const Asset = sequelize.define('borrower_emp_assets', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    borrowerInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accountType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    financialInstitution: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cashOrMarketValue: {
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

return Asset
};

// module.exports = Asset;