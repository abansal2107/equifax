const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const BorrowerUnmarriedAddendum = sequelize.define('borrower_unmarried_addendum', {

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
    otherPerson: {
        type: DataTypes.ENUM({
            values: ['0', '1']
        }),
        allowNull: false
    },
    typeOfRelationship: {
        type: DataTypes.ENUM({
            values:['1','2','3','4']
        }),
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    other: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
    }
);
return BorrowerUnmarriedAddendum
};


// module.exports = BorrowerUnmarriedAddendum;