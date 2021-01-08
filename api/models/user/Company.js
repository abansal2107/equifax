module.exports = (sequelize, DataTypes) => {
const Company = sequelize.define('companies', {

    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true ,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail:true,
      },
      unique: {
        fields: ['email'],
        message: 'Email address already in use!'
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nmlsId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accountingId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
     professionalImage: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    actionPhoto: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    professionalHistory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    professionalStatement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDeleted:{
      type: DataTypes.INTEGER,
      allowNull: false 
    }
  },{ timestamps: true },{
});
Company.associate = (models) => {
    Company.belongsTo(models.users, {foreignKey: 'managerId'});
    Company.belongsTo(models.locations, {foreignKey: 'locationId'});
    Company.hasMany(models.state_license_info, {foreignKey: 'companyId'});
 }
return Company
};