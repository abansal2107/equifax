const { DataTypes } = require('sequelize');

const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const BorrowerEmpMonthlyGrossIncome = sequelize.define('borrower_emp_monthly_gross_income', {

    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
   
    borrowerEmploymentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    base: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    overtime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    bonus: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    commission: {

        type:DataTypes.INTEGER,
        allowNull: true
     },

     militaryEntitlements: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    other: {
        type: DataTypes.INTEGER,
    },

    total: {
        type: DataTypes.INTEGER,
    }
},
    { 
        timestamps: true,
        freezeTableName: true
    },
    {
    }
);
return BorrowerEmpMonthlyGrossIncome
};
// module.exports = BorrowerEmpMonthlyGrossIncome;