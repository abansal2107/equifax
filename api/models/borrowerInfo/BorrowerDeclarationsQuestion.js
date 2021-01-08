const { Sequelize, DataTypes } = require('sequelize');
const BorrowerDeclarationsAnswer =require('./BorrowerDeclarationsAnswer');
const sequelize = require('../../../db/connection')

module.exports = (sequelize, DataTypes) => {
const BorrowerDeclarationsQuestion = sequelize.define('borrower_declarations_questions', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(['1','2']),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(['0','1']),
        allowNull: true
    }
}, {
    timestamps: true,
    freezeTableName: true
}, {

});

return BorrowerDeclarationsQuestion
};
// BorrowerDeclarationsQuestion.hasOne(BorrowerDeclarationsAnswer, { foreignKey: 'borrowerDeclarionQuestionId', as: 'borrower_declarations_answers'})
// module.exports = BorrowerDeclarationsQuestion;

