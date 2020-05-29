//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string Prefix { get; set; }
        public virtual bool IsGLProduct { get; set; }
        public virtual string ServiceType { get; set; }
        public virtual decimal MinimumBalance { get; set; }
        public virtual bool HasOverDraft { get; set; }
        public virtual decimal OverDraftLimit { get; set; }
        public virtual decimal OverDraftInterestRate { get; set; }
        public virtual int OverDraftTenor { get; set; }
        public virtual decimal DepositInterestRate { get; set; }
        public virtual int DepositTenor { get; set; }
        public virtual decimal InstitutionPercentage { get; set; }
        public virtual decimal CustomerPercentage { get; set; }
        public virtual long IncomeAccount { get; set; }
        public virtual long ExpenseAccount { get; set; }
*/
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Product = sequelize.define('Products', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Prefix: { type:  DataTypes.STRING},
    IsGLProduct: { type:  DataTypes.BOOLEAN},
    ServiceType: { type:  DataTypes.STRING},
    MinimumBalance: { type:  DataTypes.DECIMAL},
    HasOverDraft: { type:  DataTypes.BOOLEAN},
    OverDraftLimit: { type:  DataTypes.DECIMAL},
    OverDraftInterestRate: { type:  DataTypes.DECIMAL},
    OverDraftTenor: { type:  DataTypes.INTEGER},
    DepositInterestRate: { type:  DataTypes.DECIMAL},
    DepositTenor: { type:  DataTypes.INTEGER},
    InstitutionPercentage: { type:  DataTypes.DECIMAL},
    CustomerPercentage: { type:  DataTypes.DECIMAL},
    IncomeAccount: { type:  DataTypes.BIGINT},
    ExpenseAccount: { type:  DataTypes.BIGINT},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Products'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Product};