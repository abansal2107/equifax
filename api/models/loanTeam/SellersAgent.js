const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
module.exports = (sequelize, DataTypes) => {
const SellersAgent = sequelize.define('sellers_agents', {

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
    agentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  },{ 
        timestamps: true,
        freezeTableName:true  
}, {
  // Other model options go here
});
// SellersAgent.associate = (models) => {
//     SellersAgent.belongsTo(models.agents, {foreignKey: 'agentId', as: 'agents'});
//   };
return SellersAgent
};
// module.exports = SellersAgent;

