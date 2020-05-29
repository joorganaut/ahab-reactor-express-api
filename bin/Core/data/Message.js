//const connection = require('./config/connection.pg.heroku.json');
const { Op, DataTypes } = require('sequelize');
const BusinessObject = require('../BusinessObject')


/*[Column(name: "Receipient")]
        public virtual string Receipient { get; set; }
        [Column(name: "Sender")]
        public virtual string Sender { get; set; }
        [Column(name: "Body")]
        public virtual string Body { get; set; }
        [Column(name: "Title")]
        public virtual string Title { get; set; }
        [Column(name: "IsSent")]
        public virtual bool IsSent { get; set; }
        [Column(name: "MailType")]
        public virtual string MailType { get; set; }
        [Column(name: "Template")]
        public virtual string Template{ get; set; }
        [Column(name: "MessageType")]
        public virtual MessageType MessageType { get; set; }
        [Column(name: "MessageStatus")]
        public virtual MessageStatus MessageStatus { get; set; }
        [Column(name: "ErrorMessage")]
        public virtual string ErrorMessage { get; set; }
*/


const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
    ssl : false,
};
const sequelize  = BusinessObject.sequelize;
const Message = sequelize.define('Messages', {
    ID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Recipient: { type:  DataTypes.STRING},
    Sender: { type:  DataTypes.STRING},
    Body: { type:  DataTypes.STRING},
    Title: { type:  DataTypes.STRING},
    IsSent: { type:  DataTypes.BOOLEAN},
    MailType: { type:  DataTypes.STRING},
    Template: { type:  DataTypes.STRING},
    MessageType: { type:  DataTypes.INTEGER},
    MessageStatus: { type:  DataTypes.INTEGER},
    ErrorMessage: { type:  DataTypes.STRING},
    //Parent properties
    IsEnabled: { type:  DataTypes.BOOLEAN},
    DateCreated: { type:  DataTypes.DATE},
    DateLastModified: { type:  DataTypes.DATE},
    Error: { type:  DataTypes.STRING},
    CreatedBy: { type:  DataTypes.STRING},
    LastModifiedBy: { type:  DataTypes.STRING},
    Name: { type:  DataTypes.STRING},
}, 
{tableName : 'Messages'},DISABLE_SEQUELIZE_DEFAULTS);
module.exports = {Message};