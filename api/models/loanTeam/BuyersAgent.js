const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
const Agents = require('../user/Agents');
module.exports = (sequelize, DataTypes) => {
const BuyersAgents = sequelize.define('buyers_agents', {

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
    agentId : {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
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
BuyersAgents.associate = (models) => {
   BuyersAgents.belongsTo(models.agents, {foreignKey: 'agentId', as: 'agents'});
}
return BuyersAgents
};
// BuyersAgents.hasMany(Agents, {foreignKey: 'id', as: 'agents'});

// module.exports = BuyersAgents;