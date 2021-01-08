module.exports = (sequelize, DataTypes) => {
    const LoanSourceUser = sequelize.define('loan_status_users', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true ,
            allowNull: false,
        },
        loanAppId : {
            type: DataTypes.STRING,
            allowNull: false
        },

        sourceId : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{ 
        timestamps: true,
        freezeTableName:true  
    }, {
      // Other model options go here
    });
    // BuyersAgents.associate = (models) => {
    //    BuyersAgents.belongsTo(models.agents, {foreignKey: 'agentId', as: 'agents'});
    // }
    return LoanSourceUser
    };
    