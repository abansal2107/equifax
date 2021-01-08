const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
var BorrowerInfo = require('../../models/borrowerInfo/BorrowerInfo');
const {
    HISPANICOR_LATINO,
    RACE,
    ASIAN,
    NATIVEHAWAIIAN_OR_ALASKANATIVE
} = require('../../../config/strings/constant').DEMOGRAPHICINFO;

module.exports = (sequelize, DataTypes) => {
const DemographicInfo = sequelize.define('borrower_demographic_info', {

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
    ethnicity: {
        type: DataTypes.ENUM('1','2','3'),
        allowNull: false
    },
    hispanicorLatino: {
        type: DataTypes.ENUM(HISPANICOR_LATINO),
        allowNull: false
    },    
    sex: {
        type: DataTypes.ENUM('female','male','doNotProvideinfo'),
        allowNull: false
    },    
    race: {
        type: DataTypes.ENUM(RACE),
        allowNull: false
    },
    asian: {
        type: DataTypes.ENUM(ASIAN),
        allowNull: false
    },
    nativeHawaiianOrAlaskaNative: {
        type: DataTypes.ENUM(NATIVEHAWAIIAN_OR_ALASKANATIVE),
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

return DemographicInfo
};
// console.log("HISPANICOR_LATINO:",HISPANICOR_LATINO)
// DemographicInfo.belongsTo(BorrowerInfo, { foreignKey: 'borrowerInfoId', as: 'borrower_Info' })

// module.exports = DemographicInfo;