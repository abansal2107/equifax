module.exports = (sequelize, DataTypes) => {
    const Investor = sequelize.define('investors', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fhasponsorshipId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        vasponsorshipId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        executiveName: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        executivePhone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        executiveEmail: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: true
    }, {});

    Investor.associate = (models) => {
        Investor.hasMany(models.mortgage_clause, {
            foreignKey: 'investorId',
            as: 'mortgage_clause'
        })
    }

    return Investor
};