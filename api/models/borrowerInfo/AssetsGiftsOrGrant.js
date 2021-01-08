const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const AssetsGiftsOrGrant = sequelize.define('borrower_emp_assets_gifts_or_grants', {

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
    assetType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isDeposited: {
        type: DataTypes.ENUM('0', '1'),
        allowNull: true
    },
    source: {
        type: DataTypes.TEXT,
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

return AssetsGiftsOrGrant
};


// module.exports = AssetsGiftsOrGrant;