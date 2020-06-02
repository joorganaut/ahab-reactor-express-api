//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/*public virtual long RoleID { get; set; }
        public virtual long FunctionID { get; set; }*/
const sequelize  = BusinessObject.sequelize;
const RFunction = sequelize.define('RFunctions', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    RoleName:{ type:  DataTypes.STRING},
    RoleID: { type:  DataTypes.BIGINT},
    FunctionName:{ type:  DataTypes.STRING},
    FunctionID: { type:  DataTypes.BIGINT},
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    InstitutionCode: { type:  DataTypes.STRING},
    InstitutionID: { type:  DataTypes.BIGINT},
    Name: { type:  DataTypes.STRING},
},
{tableName : 'RFunctions'},
 DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {RFunction}