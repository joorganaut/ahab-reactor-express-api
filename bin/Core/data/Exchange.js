//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject');



const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Exchange = sequelize.define('Exchanges', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    UserID: { type:  DataTypes.BIGINT},
    Amount: { type:  DataTypes.DECIMAL},
    Rate: { type:  DataTypes.DECIMAL},
    FromCurrency: { type:  DataTypes.STRING},
    ToCurrency: { type:  DataTypes.STRING},
    DestinationAccount: { type:  DataTypes.STRING},
    Bank: {type: DataTypes.STRING},
    Status: { type:  DataTypes.STRING},
    Response: { type:  DataTypes.STRING},
    ExpiryDate: {type: DataTypes.DATE},
    TransactionRef: {type: DataTypes.STRING},
    //Parent properties
    InstitutionID: {type: DataTypes.BIGINT},
    InstitutionCode: {type: DataTypes.STRING},
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Exchanges'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Exchange};