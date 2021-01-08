const { DataTypes } = require('sequelize');
var Addresses = require('../common/Address')
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const BorrowerRealEstate = sequelize.define('borrower_reale_state', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('1', '2'),
        allowNull:false
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        timestamps: true,
        freezeTableName: true
    },
    {
    }
);
return BorrowerRealEstate
};
// BorrowerRealEstate.belongsTo(Addresses, { foreignKey: 'addressId', as: 'address' })

// module.exports = BorrowerRealEstate;