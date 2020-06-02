//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string AccountNumber { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual string Code { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Lien = sequelize.define('Liens', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    AccountNumber: { type:  DataTypes.STRING},
    Amount: { type:  DataTypes.DECIMAL},
    Code: { type:  DataTypes.STRING},
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
{tableName : 'Liens'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Lien};