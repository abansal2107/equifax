const {
    DataTypes
} = require('sequelize');
var Addresses = require('../common/Address')
const sequelize = require('../../../db/connection');


module.exports = (sequelize, DataTypes) => {
const BorrowerAddresses = sequelize.define('borrower_addresses', {

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
    type: {
        type: DataTypes.ENUM('current', 'former', 'mailing'),
        allowNull: false
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // howLongAtCurrentAddress: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // housing: {
    //     type: DataTypes.ENUM('1', '2', '3'),
    // },
    // rentPerMonth: {
    //     type: DataTypes.FLOAT,
    //     allowNull: false
    // },
    // createdAt: {
    //     type: DataTypes.NOW,
    // }
}, {
    timestamps: true,
    freezeTableName: true
});
BorrowerAddresses.associate = (models) => {
    // BorrowerAddresses.belongsTo(models.borrower_info)
    
  
    };
return BorrowerAddresses
};