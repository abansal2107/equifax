
module.exports = (sequelize, DataTypes) => {
    const LoanQuestionCategory = sequelize.define('loan_question_category', {
    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        }
    },
        {
            timestamps: true,
            freezeTableName: true
        },
        {
        }
    );
    return LoanQuestionCategory;
    };
    