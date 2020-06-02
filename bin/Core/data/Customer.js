//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string OtherName { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual string Email { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual DateTime DateOfBirth { get; set; }
        public virtual string BVN { get; set; }
        public virtual long UserID { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Customer = sequelize.define('Customers', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    FirstName: { type:  DataTypes.STRING},
    LastName: { type:  DataTypes.STRING},
    OtherName: { type:  DataTypes.STRING},
    PhoneNumber: { type:  DataTypes.STRING},
    Email: { type:  DataTypes.STRING},
    Gender: { type:  DataTypes.INTEGER},
    DateOfBirth: { type:  DataTypes.DATE},
    BVN: { type:  DataTypes.STRING},
    UserID: { type:  DataTypes.BIGINT},
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
{tableName : 'Customers'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Customer};