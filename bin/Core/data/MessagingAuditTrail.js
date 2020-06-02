//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual long UserID { get; set; }
        public virtual string Action { get; set; }
        public virtual string IP { get; set; }
        public virtual string AccountNumber { get; set; }
        public virtual string MobileNumber { get; set; }
        public virtual string Message { get; set; }
        public virtual DateTime RequestTime { get; set; }
        public virtual DateTime ResponseTime { get; set; }
        public virtual string ResponseCode { get; set; }
        public virtual string ResponseMessage { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const MessagingAuditTrail = sequelize.define('MessagingAuditTrails', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    UserID: { type:  DataTypes.BIGINT},
    Action: { type:  DataTypes.STRING},
    IP: { type:  DataTypes.STRING},
    AccountNumber: { type:  DataTypes.STRING},
    MobileNumber: { type:  DataTypes.STRING},
    Message: { type:  DataTypes.STRING},
    RequestTime: { type:  DataTypes.DATE},
    ResponseTime: { type:  DataTypes.DATE},
    ResponseCode: { type:  DataTypes.STRING},
    ResponseMessage: { type:  DataTypes.STRING},
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
{tableName : 'MessagingAuditTrails'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {MessagingAuditTrail};