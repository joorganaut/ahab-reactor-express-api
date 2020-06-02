//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject');


/*public virtual string AccountNumber { get; set; }
        public virtual decimal AccountBalance { get; set; }
        public virtual long ProductID { get; set; }
        public virtual long CustomerID { get; set; }
        public virtual bool IsGL { get; set; }
        public virtual decimal MinimumBalance { get; set; }
        public virtual bool HasOverDraft { get; set; }
        public virtual decimal OverDraftLimit { get; set; }
        public virtual decimal OverDraftInterestRate { get; set; }
        public virtual int OverDraftTenor { get; set; }
        public virtual decimal DepositInterestRate { get; set; }
        public virtual int DepositTenor { get; set; }
        public virtual AccountStatus Status { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Currency = sequelize.define('Currencies', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Code: { type:  DataTypes.STRING},
    HomeCurrencyID: { type:  DataTypes.BIGINT},
    ExchangeRate: { type:  DataTypes.DECIMAL},
    Description: {type: DataTypes.STRING},
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
{tableName : 'Currencies'}, DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Currency};