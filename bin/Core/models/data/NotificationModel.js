/*
   Title?: string;
    Sender?: string;
    Body?: number;
    Status?: 'read' | 'unread' | 'deleted' 
*/
const {BaseModel} = require('../../contracts/BaseModel');
class NotificationModel extends BaseModel{
    constructor(props){
        super(props);
        this.Title = props === undefined ? '' :  props.Title;
        this.Sender = props === undefined ? 0 :  props.Sender;
        this.Body = props === undefined ? '' : props.Body;
        this.Status = props === undefined ? '' :  props.Status;
        this.Recipient = props === undefined ? '' : props.Recipient;
        this.Template = props === undefined ? null :  props.Template;
        this.TransactionType = props === undefined ? '' : props.TransactionType;
        this.TransactionID = props === undefined ? null : props.TransactionID;
    }
} 
module.exports = {NotificationModel};