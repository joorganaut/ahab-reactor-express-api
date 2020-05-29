//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string EntityName { get; set; }
        public virtual long EntityID { get; set; }
        public virtual string Street { get; set; }
        public virtual string City { get; set; }
        public virtual string State { get; set; }
        public virtual string Country { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Address = sequelize.define('Addresses', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    EntityName: { type:  DataTypes.STRING},
    EntityID: { type:  DataTypes.BIGINT},
    Street: { type:  DataTypes.STRING},
    City: { type:  DataTypes.STRING},
    State: { type:  DataTypes.STRING},
    Country: { type:  DataTypes.STRING},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Addresses'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Address};