module.exports = (sequelize, DataTypes) => {
    const loanTrackingUser = sequelize.define('loan_status_user', {
        loanAppId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        borrowerInfoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        masterStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },

        changedBy: {
            type: DataTypes.STRING,
            allowNull: false
        },

        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        timestamps: true
    });

    loanTrackingUser.associate = (models) => {
        loanTrackingUser.belongsTo(models.loan_tracking_masters, {
            foreignKey: 'masterStatus',
            // as: 'borrower_others'
        })

    };
    return loanTrackingUser
};