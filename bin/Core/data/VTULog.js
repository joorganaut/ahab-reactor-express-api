
//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*
public virtual string MSISDN { get; set; }
        public virtual string Network { get; set; }
        public virtual string Status { get; set; }
        public virtual string RequestID { get; set; }
        public virtual bool IsSuccessful { get; set; }
        public virtual VTUSource Source { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual string StatusMessage { get; set; }
        public virtual string ResponseMessage { get; set; }
        public virtual int ResponseCode{ get; set; }
*/



const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const VTULog = sequelize.define('VTULogs', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    MSISDN: { type:  DataTypes.STRING},
    Network: { type:  DataTypes.STRING},
    Amount: { type:  DataTypes.DECIMAL},
    Status: { type:  DataTypes.STRING},
    RequestID: { type:  DataTypes.STRING},
    IsSuccessful: {type: DataTypes.BOOLEAN},
    StatusMessage: { type:  DataTypes.STRING},
    ResponseMessage: { type:  DataTypes.STRING},
    ResponseCode: { type:  DataTypes.INTEGER},
    Source: { type:  DataTypes.INTEGER},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'VTULogs'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {VTULog}