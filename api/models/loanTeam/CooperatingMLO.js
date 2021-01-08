const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
const User = require('../user/User');
module.exports = (sequelize, DataTypes) => {
const CooperatingMLO = sequelize.define('cooperating_mlo', {

    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
    loanAppNo: {        
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.NOW,
    },

  },{ 
        timestamps: true,
        freezeTableName:true
}, {
  // Other model options go here 
  indexes: [{ unique: true, fields: ['loanAppNo','userId'] }] 
});
return CooperatingMLO
};
// CooperatingMLO.belongsTo(User, {foreignKey: 'userId', as: 'users'});

// module.exports = CooperatingMLO;
