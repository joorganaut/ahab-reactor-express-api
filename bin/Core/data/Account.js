//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


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
const Account = sequelize.define('Accounts', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    AccountNumber: { type:  DataTypes.STRING},
    AccountBalance: { type:  DataTypes.DECIMAL},
    ProductID: { type:  DataTypes.BIGINT},
    CustomerID: { type:  DataTypes.BIGINT},
    IsGL: { type:  DataTypes.BOOLEAN},
    MinimumBalance: { type:  DataTypes.DECIMAL},
    HasOverDraft: {type: DataTypes.BOOLEAN},
    OverDraftLimit: { type:  DataTypes.DECIMAL},
    OverDraftInterestRate: { type:  DataTypes.DECIMAL},
    OverDraftTenor: { type:  DataTypes.INTEGER},
    DepositInterestRate: { type:  DataTypes.DECIMAL},
    DepositTenor: { type:  DataTypes.INTEGER},
    Status: { type:  DataTypes.INTEGER},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Accounts'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Account}