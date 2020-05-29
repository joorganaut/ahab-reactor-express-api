//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual long UserID { get; set; }
        public virtual string Username { get; set; }
        public virtual string Action { get; set; }
        public virtual string IP { get; set; }
        public virtual string MAC { get; set; }
        public virtual string Request { get; set; }
        public virtual string Response { get; set; }
        public virtual DateTime RequestTime { get; set; }
        public virtual DateTime ResponseTime { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const AuditTrail = sequelize.define('AuditTrails', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    UserID: { type:  DataTypes.BIGINT},
    Username: { type:  DataTypes.STRING},
    Action: { type:  DataTypes.STRING},
    IP: { type:  DataTypes.STRING},
    MAC: { type:  DataTypes.STRING},
    Request: { type:  DataTypes.STRING},
    Response: { type:  DataTypes.STRING},
    RequestTime: { type:  DataTypes.DATE},
    ResponseTime: { type:  DataTypes.DATE},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'AuditTrails'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {AuditTrail};