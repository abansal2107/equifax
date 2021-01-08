const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const User = require('../user/User');

const sequelize = require('../../../db/connection')

module.exports = (sequelize, DataTypes) => {
const PrimaryMLO = sequelize.define('primary_mlo', {

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },{ 
        timestamps: true,
        freezeTableName:true  
}, {
  // Other model options go here
});
PrimaryMLO.associate = (models) => {
    PrimaryMLO.belongsTo(models.users, {foreignKey: 'userId', as: 'users'});
  };
return PrimaryMLO
};
// PrimaryMLO.belongsTo(User, {foreignKey: 'userId', as: 'users'});

// module.exports = PrimaryMLO;
