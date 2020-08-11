//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject');


/*public virtual string DestinationAccount { get; set; }
        public virtual string MerchantName {get; set; }
        public virtual string SourceAccount { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual long MerchantID { get; set; }
        public virtual long CustomerID { get; set; }
        public virtual string CustomerCode { get; set; }
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
const Payment = sequelize.define('Payments', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    MerchantName: {type: DataTypes.STRING},
    DestinationAccount: { type:  DataTypes.STRING},
    SourceAccount: { type:  DataTypes.STRING},
    Amount: { type:  DataTypes.DECIMAL},
    MerchantID: { type:  DataTypes.BIGINT},
    CustomerID: { type:  DataTypes.BIGINT},
    CustomerCode: { type:  DataTypes.STRING},
    Narration: { type:  DataTypes.STRING},
    Fee: { type:  DataTypes.DECIMAL},
    Vat: { type:  DataTypes.DECIMAL},
    Status: { type:  DataTypes.INTEGER},
    CurrencyID: {type: DataTypes.BIGINT},
    Currency: {type: DataTypes.STRING},
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
{tableName : 'Payments'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Payment};