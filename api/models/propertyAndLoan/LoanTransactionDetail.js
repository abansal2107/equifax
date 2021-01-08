
module.exports = (sequelize, DataTypes) => {
    const LoanTransactionDetail = sequelize.define('loan_transaction_detail', {
    
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
        salseContract: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        improvements: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        land: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        forRefinance: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        creditCardsAndOther: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        borrowerClosingCosts: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        discountPoints: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        loanAmount: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        OtherNewMoergage: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        sellerCredits: {
            type: DataTypes.FLOAT(18,2),
            allowNull: true
        },
        OtherCredits: {
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
    return LoanTransactionDetail
    };
    