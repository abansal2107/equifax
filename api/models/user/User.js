const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('users', {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM({
            values: [0,1]
        }),
        allowNull: false
    }
  }, {
  // Other model options go here
});


User.associate = (models) => {
    User.belongsTo(models.roles, {foreignKey: 'role_category_id'});
    // User.belongsTo(models.sales);
    // User.belongsTo(models.sales, {foreignKey: 'cooperatingMlo'});
    // User.belongsTo(models.sales, {foreignKey: 'mloa'});
}
return User
};
