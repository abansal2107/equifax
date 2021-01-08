const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const Compliance = sequelize.define('compliance', {

    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
    loanAppNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postClosingReviewer: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
   },
    { 
        timestamps: true,
        freezeTableName:true
    },
   
);

Compliance.associate = (models) => {
    Compliance.belongsTo(models.users, {foreignKey: 'postClosingReviewer',as:'postClosingReviewers'});

  };
return Compliance
};
