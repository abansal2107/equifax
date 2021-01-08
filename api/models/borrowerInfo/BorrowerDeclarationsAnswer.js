const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../../db/connection')

module.exports = (sequelize, DataTypes) => {
const BorrowerDeclarationsAnswer = sequelize.define('borrower_declarations_answers', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    borrowerInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowerDeclarionQuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
}, {

});
return BorrowerDeclarationsAnswer
};
// module.exports = BorrowerDeclarationsAnswer;

