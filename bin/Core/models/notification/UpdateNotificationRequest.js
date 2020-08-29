const BaseRequest = require('../../contracts/BaseRequest');
const {NotificationModel} = require('../data/NotificationModel');
class UpdateNotificationRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Model =   props === undefined ? {} : new NotificationModel(props);
    }
}
module.exports = {UpdateNotificationRequest};