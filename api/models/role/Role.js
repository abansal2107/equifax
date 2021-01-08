module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subSection: {
      type: DataTypes.STRING,
      allowNull: false
    },

    department:{
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(0, 1),
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Role.associate = (models) => {
    Role.hasMany(models.role_types, {
      foreignKey: 'roleId',
      as: 'role_types'
    })
  };
  return Role
};