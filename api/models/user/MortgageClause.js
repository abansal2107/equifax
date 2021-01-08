const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
var opts = {
    define: {

        freezeTableName: true
    }
}
const sequelize = require('../../../db/connection')
module.exports = (sequelize, DataTypes) => {
const MortgageClause = sequelize.define('mortgage_clause', {

    investorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    coverageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loanType: {
        type: DataTypes.STRING,
        allowNull: true
    },
  },{ 
        timestamps: false,
        freezeTableName:true 
    },{

    });
    return MortgageClause
};

