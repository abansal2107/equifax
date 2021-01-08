const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');


module.exports = (sequelize, DataTypes) => {
const AssetsCreditsOther = sequelize.define('borrower_emp_assets_credits_other', {

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
    assetsOrCreditType: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cashOrMarketValue: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: true,
        freezeTableName: true
    },
    {
    }
);

return AssetsCreditsOther
};

// module.exports = AssetsCreditsOther;