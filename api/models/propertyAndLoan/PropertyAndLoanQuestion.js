
module.exports = (sequelize, DataTypes) => {
    const PropertyAndLoanQuestion = sequelize.define('property_and_loan_question', {
    
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
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inputType: {
            type: DataTypes.ENUM('radio', 'check', 'text'),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('L1','L2','L3'),
            allowNull: false
        },
        questionCategoryId: {
            type: DataTypes.INTEGER,
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
    PropertyAndLoanQuestion.associate = (models) => {
        PropertyAndLoanQuestion.belongsTo(models.loan_question_category, { foreignKey: 'questionCategoryId'});
    };
    return PropertyAndLoanQuestion
    };
    