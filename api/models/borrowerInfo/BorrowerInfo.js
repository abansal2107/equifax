module.exports = (sequelize, DataTypes) => {
    const BorrowerInfo = sequelize.define('borrower_info', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        loanAppNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        suffix: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: {
                fields: ['email'],
                message: 'Email address already in use!'
            },
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },

        mlo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastContacted: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ssn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        citizenship: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maritalStatus: {
            type: DataTypes.ENUM('1', '2', '3'),
        },
        noOfDependantChilds: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        agesDependantChilds: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactInfo: {
            type: DataTypes.JSON,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Active', 'In-Active'),
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.NOW,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    }, {});
    BorrowerInfo.associate = (models) => {
        BorrowerInfo.hasMany(models.borrower_reale_state_properties)
        BorrowerInfo.hasMany(models.borrower_reale_state_mortgage_loans)
        BorrowerInfo.belongsToMany(models.addresses, {
            through: 'borrower_addresses'
        });
        BorrowerInfo.hasOne(models.borrower_unmarried_addendum)
        BorrowerInfo.hasOne(models.borrower_type_of_credit)
        BorrowerInfo.hasMany(models.borrower_others, {
            foreignKey: 'borrowerInfoId',
            as: 'borrower_others'
        })
        BorrowerInfo.belongsToMany(models.addresses, {
            through: 'property_info',
            as:'propertyDetails'
        });
        BorrowerInfo.hasOne(models.loan_status_user,{
            foreignKey: 'borrowerInfoId',
        })
    };
    return BorrowerInfo
};