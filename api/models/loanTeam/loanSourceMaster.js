module.exports = (sequelize, DataTypes) => {
const LoanSourceMaster = sequelize.define('loan_source_master', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true ,
        allowNull: false,
    },
    type : {
        type: DataTypes.STRING,
        allowNull: false
    },
    source : {
        type: DataTypes.STRING,
        allowNull: false
    },
  
},{ 
    timestamps: true,
    freezeTableName:true  
}, {
  // Other model options go here
});
// BuyersAgents.associate = (models) => {
//    BuyersAgents.belongsTo(models.agents, {foreignKey: 'agentId', as: 'agents'});
// }
return LoanSourceMaster
};
