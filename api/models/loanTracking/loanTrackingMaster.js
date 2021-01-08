module.exports = (sequelize, DataTypes) => {
    const loanTrackingMaster = sequelize.define('loan_tracking_masters', {
        status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status_type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    loanTrackingMaster.associate = (models) => {
      // loanTrackingMaster.hasMany(models.loan_status_user, {
      //   foreignKey: 'masterStatus',
      //   // as: 'role_types'
      // })
    };
    return loanTrackingMaster
  };