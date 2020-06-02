//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
/*public virtual bool IsAdmin { get; set; }
        public virtual long UserID { get; set; }
        public virtual long RoleID { get; set; }
        public virtual string Username { get; set; }
        public virtual string RoleName { get; set; }*/
const sequelize  = BusinessObject.sequelize;
const UserRole = sequelize.define('UserRoles', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    IsAdmin: { type:  DataTypes.BOOLEAN},
    UserID: { type:  DataTypes.BIGINT},
    RoleID: { type:  DataTypes.BIGINT},
    Username: { type:  DataTypes.STRING},
    RoleName: { type:  DataTypes.STRING},
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
{tableName : 'UserRoles'},
 DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {UserRole}