const { Sequelize, DataTypes } = require('sequelize');
/* const sequelize = new Sequelize('mysql::memory:'); */
const sequelize = require('../../../db/connection')
module.exports = (sequelize, DataTypes) => {
const StateAuthorization = sequelize.define('state_authorizations', {
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    license_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM({
            values: [0,1]
        }),
        allowNull: false
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }
  }, {
  // Other model options go here
});
return StateAuthorization
};
