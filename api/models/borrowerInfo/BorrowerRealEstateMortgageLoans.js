const { DataTypes } = require('sequelize');
// var borrowerRealState = require('../borrowerInfo/borrowerRealState')
const sequelize = require('../../../db/connection');
module.exports = (sequelize, DataTypes) => {
const BorrowerRealEstateMortgageLoans = sequelize.define('borrower_reale_state_mortgage_loans', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    borrowerinfoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creditorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },

    monthlyMortgagePayment: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false
    },
    unpaidBalance: {
        type:DataTypes.FLOAT(10,2),
        allowNull: false
    },
    toBePaidOfAt: {
        type: DataTypes.ENUM('0', '1'),
        allowNull:false
    },
    type: {
        type: DataTypes.ENUM('fha', 'va', 'conventional','usda-rd', 'other'),
        allowNull:false
    },
 
    creditLimit: {
        type:DataTypes.FLOAT(10,2),
        allowNull: false
    },
 
},
    {
        timestamps: true,
        freezeTableName: true
    },
    {
    }
);
BorrowerRealEstateMortgageLoans.associate = (models) => {
    BorrowerRealEstateMortgageLoans.belongsTo(models.borrower_info, 
        {foreignKey: 'borrowerinfoId'// as: 'BorrowerRealEstate'
  })
  };
return BorrowerRealEstateMortgageLoans;

};

// BorrowerRealEstateMortgageLoans.belongsTo(borrowerRealState, { foreignKey: 'BorrowerRealEstateId', as: 'BorrowerRealEstate' })

// module.exports = BorrowerRealEstateMortgageLoans;