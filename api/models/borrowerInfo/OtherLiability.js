const { DataTypes } = require('sequelize');

const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const OtherLiability = sequelize.define('borrower_liabilities_other', {

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
    type : {
        type: DataTypes.STRING,
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
return OtherLiability
};
// module.exports = OtherLiability;