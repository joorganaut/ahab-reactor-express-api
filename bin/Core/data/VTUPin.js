//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string Pin { get; set; }
        public virtual string Network { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual DateTime ExpiryDate { get; set; }
        public virtual long BatchID { get; set; }
        public virtual bool IsUsed { get; set; }
        public virtual bool IsSuccessful { get; set; }
        public virtual string VTUResponse { get; set; }
        public virtual bool IsBilled { get; set; }
        public virtual string MSISDN { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const VTUPin = sequelize.define('VTUPins', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Pin: { type:  DataTypes.STRING},
    Network: { type:  DataTypes.STRING},
    Amount: { type:  DataTypes.DECIMAL},
    ExpiryDate: { type:  DataTypes.DATE},
    BatchID: { type:  DataTypes.BIGINT},
    IsUsed: { type:  DataTypes.BOOLEAN},
    IsSuccessful: {type: DataTypes.BOOLEAN},
    VTUResponse: { type:  DataTypes.STRING},
    IsBilled: { type:  DataTypes.BOOLEAN},
    MSISDN: { type:  DataTypes.STRING},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'VTUPins'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {VTUPin}