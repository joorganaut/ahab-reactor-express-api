//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string Account { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual string Narration { get; set; }
        public virtual string TransactionRef { get; set; }
        public virtual string TraceID { get; set; }
        public virtual string Source { get; set; }
        public virtual string GuidRef { get; set; }
        public virtual TransactionType Type { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Transaction = sequelize.define('Transactions', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Account: { type:  DataTypes.STRING},
    Amount: { type:  DataTypes.DECIMAL},
    Narration: { type:  DataTypes.STRING},
    TransactionRef: { type:  DataTypes.STRING},
    TraceID: { type:  DataTypes.STRING},
    Source: { type:  DataTypes.STRING},
    GuidRef: { type:  DataTypes.STRING},
    Type: { type:  DataTypes.INTEGER},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Transactions'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Transaction};