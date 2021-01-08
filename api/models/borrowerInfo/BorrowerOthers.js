const { DataTypes } = require('sequelize');

const sequelize = require('../../../db/connection');


module.exports = (sequelize, DataTypes) => {
const BorrowerOthers = sequelize.define('borrower_others', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    borrowerInfoId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    suffix: {
        type: DataTypes.STRING,
        allowNull: false
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
return BorrowerOthers
};

// module.exports = BorrowerOthers;
