//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject');


/*public virtual string Code { get; set; }
        public virtual string ContactEmail { get; set; }
        public virtual string ContactPhonenumber { get; set; }
        public virtual string ContactAddress { get; set; }
        public virtual string DecryptionKey { get; set; }
        public virtual string PassPhrase { get; set; }
        public virtual string Password { get; set; }
        public virtual string EncryptionKey { get; set; }
        public virtual string LocalConnectionString { get; set; }
        public virtual string RemoteConnectionString { get; set; }
        public virtual string Industry { get; set; }
        public virtual string ShortName { get; set; }
        public virtual string ApprovedIP { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Institution = sequelize.define('Institutions', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Code: { type:  DataTypes.STRING},
    ContactEmail: { type:  DataTypes.STRING},
    ContactPhonenumber: { type:  DataTypes.STRING},
    ContactAddress: { type:  DataTypes.STRING},
    DecryptionKey: { type:  DataTypes.TEXT},
    PassPhrase: { type:  DataTypes.STRING},
    Password: {type: DataTypes.STRING},
    EncryptionKey: { type:  DataTypes.TEXT},
    LocalConnectionString: { type:  DataTypes.STRING},
    RemoteConnectionString: { type:  DataTypes.STRING},
    Industry: { type:  DataTypes.STRING},
    ShortName: { type:  DataTypes.STRING},
    ApprovedIP:{type: DataTypes.STRING},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Institutions'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Institution};