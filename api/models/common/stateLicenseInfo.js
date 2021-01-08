module.exports = (sequelize, DataTypes) => {
    const stateLicenseInfo = sequelize.define('state_license_info', {
    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        stateId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },

          companyId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },

          locationId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          authorizedExpire: {
            type: DataTypes.DATE,
            allowNull: false
          },
          licenseNumber: {
            type: DataTypes.STRING,
            allowNull: false
          },
          authorizationStatus: {
            type: DataTypes.STRING,
            allowNull: false
          },
          isDeleted:{
            type: DataTypes.INTEGER,
            allowNull: false 
          }
    },
        {   timestamps:true,
            freezeTableName: true
        },
        {
        }
    );
    
    stateLicenseInfo.associate = (models) => {
      stateLicenseInfo.belongsTo(models.companies)
      stateLicenseInfo.belongsTo(models.locations)
      stateLicenseInfo.belongsTo(models.states)
    
    };
    return stateLicenseInfo
    };