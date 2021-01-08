const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
module.exports = (sequelize, DataTypes) => {
const SellersTeam = sequelize.define('sellers_team', {

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
    salesAgent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    salesAgentAssistant: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    salesTeam: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
   },{ 
        timestamps: true,
        freezeTableName:true  
  }, {
  // Other model options go here
});

SellersTeam.associate = (models) => {
    SellersTeam.belongsTo(models.users, {foreignKey: 'salesAgent',as: 'salesAgents'});
    SellersTeam.belongsTo(models.users, {foreignKey: 'salesAgentAssistant',as: 'salesAgentAssistants'});
    SellersTeam.belongsTo(models.users, {foreignKey: 'salesTeam',as: 'salesTeams'});
  };
return SellersTeam
};

// module.exports = SellersTeam;

