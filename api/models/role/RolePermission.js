const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')

module.exports = (sequelize, DataTypes) => {
const RolePermission = sequelize.define('role_permissions', {
    roleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    urlPath: {
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
  // Other model options go here
});

return RolePermission
};
