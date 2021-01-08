const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const BorrowerTypeOfCredit = sequelize.define('borrower_type_of_credit', {

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
    type: {
        type: DataTypes.ENUM({
            values: ['1', '2']
        }),
        allowNull: false
    },
    noOfBorrowers: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    initials: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.NOW,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
    }
);

return BorrowerTypeOfCredit
};

// module.exports = BorrowerTypeOfCredit;