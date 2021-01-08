const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const Fullfillment = sequelize.define('fullfillments', {

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
    setupCordinator: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fullfillmentCordinator: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    closingCordinator: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
  },
    { 
        timestamps: false,
    },
    {
    
    }
);

Fullfillment.associate = (models) => {
    Fullfillment.belongsTo(models.users, {foreignKey: 'setupCordinator',as: 'setupCordinators'});
    Fullfillment.belongsTo(models.users, {foreignKey: 'fullfillmentCordinator',as: 'fullfillmentCordinators'});
    Fullfillment.belongsTo(models.users, {foreignKey: 'closingCordinator',as: 'closingCordinators'});

  };
return Fullfillment
};
// module.exports = Fullfillment;
