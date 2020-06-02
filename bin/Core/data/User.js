//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string Username { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string FullName { get; set; }
        public virtual string Password { get; set; }
        public virtual string TransactionPin { get; set; }
        public virtual bool IsAuthenticated { get; set; }
        public virtual bool ForcePasswordChange { get; set; }
        public virtual DateTime LastLoginDate { get; set; }
        public virtual int NumberOfFailedAttempts { get; set; }
        public virtual string Email { get; set; }
        public virtual string ActivationLink { get; set; }
        public virtual List<UserRole> Roles { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const User = sequelize.define('Users', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Username: { type:  DataTypes.STRING},
    FirstName: { type:  DataTypes.STRING},
    LastName: { type:  DataTypes.STRING},
    FullName: { type:  DataTypes.STRING},
    Password: { type:  DataTypes.STRING},
    TransactionPin: { type:  DataTypes.STRING},
    IsAuthenticated: {type: DataTypes.BOOLEAN},
    ForcePasswordChange: { type:  DataTypes.BOOLEAN},
    LastLoginDate: { type:  DataTypes.DATE},
    NumberOfFailedAttempts: { type:  DataTypes.INTEGER},
    Email: { type:  DataTypes.STRING},
    ActivationLink: { type:  DataTypes.TEXT},
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
{tableName : 'Users'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {User};