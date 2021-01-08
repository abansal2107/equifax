
module.exports = (sequelize, DataTypes) => {
    const PropertyAndLoanAnswer = sequelize.define('property_and_loan_answer', {
    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        propertyInfoId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        borrowerInfoId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        answer: {
            type: DataTypes.STRING,
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
    return PropertyAndLoanAnswer
    };
    