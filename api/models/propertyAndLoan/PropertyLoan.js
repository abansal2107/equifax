
module.exports = (sequelize, DataTypes) => {
    const PropertyLoan = sequelize.define('property_loans', {
    
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
        loanAmount: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        loanPurpose: {
            type: DataTypes.ENUM('purchase','reference','construction'),
            allowNull: false
        }
    },
        {
            timestamps: true,
            freezeTableName: true
        },
        {
        }
    );
    return PropertyLoan
    };
    