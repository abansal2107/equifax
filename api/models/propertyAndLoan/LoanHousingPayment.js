
module.exports = (sequelize, DataTypes) => {
    const LoanHousingPayment = sequelize.define('loan_housing_payment', {
    
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
        firstMortgage: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        subordinate: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        homeOwnersInsurance: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        supplementalPropertyInsurance: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        propertyTaxes: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        mortagageInsurance: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        associationDues: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        other: {
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
    return LoanHousingPayment
    };
    