

module.exports = (sequelize, DataTypes) => {
const PropertyInfo = sequelize.define('property_info', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    borrowerInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    propertyValue: {
        type: DataTypes.FLOAT(18,2),
        allowNull: false
    },
    accupancy: {
        type: DataTypes.ENUM('primaryResidenc','secondHome','investmentProperty'),
        allowNull: false
    },
    q1: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    q2: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    expectedMonthalyRentalIncome: {
        type: DataTypes.FLOAT(18,2),
        allowNull: true
    },
    expectedNetMonthalyRentalIncome: {
        type: DataTypes.FLOAT(18,2),
        allowNull: true
    }
},
    {
        timestamps: true,
        freezeTableName: true
    },
    {
    }
);
PropertyInfo.associate = (models) => {
    PropertyInfo.belongsTo(models.addresses, { foreignKey: 'addressId'});
    PropertyInfo.hasMany(models.property_loans, { foreignKey: 'propertyInfoId' });
    PropertyInfo.hasMany(models.property_mortgage_loans, { foreignKey: 'propertyInfoId'});
    // PropertyInfo.belongsToMany(models.addresses, {
    //     through: 'property_info',
    //     as:'propertyDetails'
    // });
};
return PropertyInfo
};
