
module.exports = (sequelize, DataTypes) => {
    const PropertyMortgageLoan = sequelize.define('property_mortgage_loans', {
    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        propertyInfoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        creditorName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lienType: {
            type: DataTypes.ENUM('firstLien','subordinateLien'),
            allowNull: true 
        },
        monthalyPayment: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        loanOrToBedrawnAmount: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        creditLimit: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
    },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
    return PropertyMortgageLoan
    };
    