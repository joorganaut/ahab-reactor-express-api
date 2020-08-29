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
    }
} 
module.exports = {NotificationModel};