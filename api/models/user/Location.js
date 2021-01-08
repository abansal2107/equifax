module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('locations', {

    office: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    nmlsId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    accountingId: {
      type: DataTypes.STRING,
      allowNull: false
    },

    alias: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true
    },

    websitePhoto: {
      type: DataTypes.STRING,
      allowNull: true
    },

    locationStatement: {
      type: DataTypes.STRING,
      allowNull: true
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true
    },

    isDeleted: {
      type: DataTypes.INTEGER,
      allowNull: true
    }


  }, {
    timestamps: false
  }, {});

  Location.associate = (models) => {
    Location.belongsTo(models.users, {
      foreignKey: 'managerId'
    });
    Location.hasMany(models.state_license_info, {
      foreignKey: 'locationId'
    });
  }
  return Location
};