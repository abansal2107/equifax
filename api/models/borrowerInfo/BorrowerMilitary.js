const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
const { MILITARY_STATUS } = require('../../../config/strings/constant')

module.exports = (sequelize, DataTypes) => {
const BorrowerMilitary = sequelize.define('borrower_military', {

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
    militaryService: {
        type: DataTypes.ENUM('Yes','No'),
        allowNull: false
    },
    militaryStatus: {
        type: DataTypes.ENUM(MILITARY_STATUS),
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
BorrowerMilitary.associate = (models) => {
    BorrowerMilitary.belongsTo(models.borrower_info, { foreignKey: 'borrowerInfoId', as: 'borrower_info' })
};
return BorrowerMilitary
};
