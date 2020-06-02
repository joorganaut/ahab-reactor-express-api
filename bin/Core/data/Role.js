//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Role = sequelize.define('Roles', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    IsTransactable: { type:  DataTypes.BOOLEAN},
    TransactionAmount: { type:  DataTypes.DECIMAL},
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    InstitutionCode: { type:  DataTypes.STRING},
    InstitutionID: { type:  DataTypes.BIGINT},
    Name: { type:  DataTypes.STRING},
},
{tableName : 'Roles'},
 DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Role};