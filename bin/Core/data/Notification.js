//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Notification = sequelize.define('Notifications', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Recipient: { type:  DataTypes.BIGINT},
    Sender: { type:  DataTypes.STRING},
    Body: { type:  DataTypes.STRING},
    Title: { type:  DataTypes.STRING},
    Status: { type:  DataTypes.STRING},
    Template: { type:  DataTypes.STRING},
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
{tableName : 'Notifications'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Notification};