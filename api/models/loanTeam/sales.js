module.exports = (sequelize, DataTypes) => {
const Sales = sequelize.define('sales', {

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
    primaryMlo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cooperatingMlo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mloa: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    pMloLocationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cMloLocationId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mloaLocationId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
  },{ 
        timestamps: true,
        freezeTableName:true  
}, {
});
Sales.associate = (models) => {
    Sales.belongsTo(models.users, {foreignKey: 'primaryMlo',as: 'primaryMlos'});
    Sales.belongsTo(models.users, {foreignKey: 'cooperatingMlo',as: 'cooperatingMlos'});
    Sales.belongsTo(models.users, {foreignKey: 'mloa',as: 'mloas'});
    Sales.belongsTo(models.locations, {foreignKey: 'pMloLocationId',as: 'primaryMloLocation'});
    Sales.belongsTo(models.locations, {foreignKey: 'cMloLocationId',as: 'cooperatingMloLocation'});
    Sales.belongsTo(models.locations, {foreignKey: 'mloaLocationId',as: 'mloaLocation'});
  };
return Sales
};

