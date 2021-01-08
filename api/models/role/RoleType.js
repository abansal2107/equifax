const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
const RolePermission = require('./RolePermission')
module.exports = (sequelize, DataTypes) => {
const RoleType = sequelize.define('role_types', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    view: {
      type: DataTypes.ENUM(0,1),
      allowNull: false
    },
    add: {
      type: DataTypes.ENUM(0,1),
      allowNull: false
    },
    edit: {
      type: DataTypes.ENUM(0,1),
      allowNull: false
    },
    del: {
      type: DataTypes.ENUM(0,1),
      allowNull: false
    },
    detail: {
      type: DataTypes.ENUM(0,1),
      allowNull: false
    }
  }, {
    
});
RoleType.associate = (models) => {
  RoleType.hasMany(models.role_permissions, { foreignKey: 'roleTypeId', as: 'role_permissions'})
};
return RoleType
};
