module.exports = (sequelize, DataTypes) => {
    const States = sequelize.define('states', {
    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        abbreviation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        } 
    },
        {   timestamps:false,
            freezeTableName: true
        },
        {
        }
    );
    
    States.associate = (models) => {
        // // Address.belongsTo(models.borrower_addresses)
        // Address.belongsToMany(models.borrower_info, {
        //     through: 'borrower_addresses',
        //     // as: 'address',
        //     // foreignKey: 'addressId'
        //   });
    };
    return States
    };