//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject');


/*public virtual string DestinationAccount { get; set; }
        public virtual string MerchantName {get; set; }
        public virtual string SourceAccount { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual long MerchantID { get; set; }
        public virtual long CustomerID { get; set; }
        public virtual string Narration { get; set; }
        public virtual decimal Fee { get; set; }
        public virtual decimal Vat { get; set; }
        public virtual TransactionStatus Status { get; set; }
        public virtual long CurrencyID {get; set; }
        public virtual string Currency {get; set; }
*/
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Merchant = sequelize.define('Merchants', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    AccountNumber: { type:  DataTypes.STRING},
    Fields: { type:  DataTypes.JSONB},
    Products: { type:  DataTypes.JSONB},
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
{tableName : 'Merchants'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Merchant};