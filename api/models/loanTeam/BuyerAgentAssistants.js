const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
module.exports = (sequelize, DataTypes) => {
const Table = sequelize.define('buyer_agent_assistants', {

    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
    buyer_agent_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {

    	type: DataTypes.STRING,
        allowNull: false
    },
    phone : {
  		
  		type: DataTypes.STRING,
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


return Table
};

// module.exports = Table;