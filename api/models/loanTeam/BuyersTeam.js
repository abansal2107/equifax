const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')

module.exports = (sequelize, DataTypes) => {
const BuyersTeam = sequelize.define('buyers_team', {

    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
    loanAppNo : {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerAgent : {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    buyerAgentAssistant : {
        type: DataTypes.STRING,
        allowNull: true
    },
    buyerAgentTeam : {
        type: DataTypes.STRING,
        allowNull: true
    },   
    buyerAgentLocation : {
        type: DataTypes.STRING,
        allowNull: true
    },
    buyerAgentAssistantLocation : {
        type: DataTypes.STRING,
        allowNull: true
    },
    buyerAgentTeamLocation : {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt : {
        type: DataTypes.NOW,
    },
},{ 
    timestamps: false,
    freezeTableName:true  
}, {
  // Other model options go here
});

BuyersTeam.associate = (models) => {
    BuyersTeam.belongsTo(models.users, {foreignKey: 'buyerAgent',as: 'buyerAgents'});
    BuyersTeam.belongsTo(models.users, {foreignKey: 'buyerAgentAssistant',as: 'buyerAgentAssistants'});
    BuyersTeam.belongsTo(models.users, {foreignKey: 'buyerAgentTeam',as: 'buyerAgentTeams'});
    BuyersTeam.belongsTo(models.locations, {foreignKey: 'buyerAgentLocation',as: 'buyerAgentLocations'});
    BuyersTeam.belongsTo(models.locations, {foreignKey: 'buyerAgentAssistantLocation',as: 'buyerAgentAssistantLocations'});
    BuyersTeam.belongsTo(models.locations, {foreignKey: 'buyerAgentTeamLocation',as: 'buyerAgentTeamLocations'});
}
return BuyersTeam
};

// module.exports = BuyersTeam;