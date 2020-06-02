//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string Title { get; set; }
        public virtual string Body { get; set; }
        public virtual string SenderDisplayName { get; set; }
        public virtual string SenderEmail { get; set; }
        public virtual List<string> DefaultEmails { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const EmailConfiguration = sequelize.define('EmailConfigurations', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Title: { type:  DataTypes.STRING},
    Body: { type:  DataTypes.STRING},
    SenderDisplayName: { type:  DataTypes.STRING},
    SenderEmail: { type:  DataTypes.STRING},
    DefaultEmails: { type:  DataTypes.STRING},
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
{tableName : 'EmailConfigurations'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {EmailConfiguration};