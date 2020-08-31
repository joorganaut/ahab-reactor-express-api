const {SearchParameter} = require("../CoreBanking/common/SearchParameter");

class ViewAllNotificationRequest extends SearchParameter{
    constructor(props){
        super(props);
        this.Status = props === undefined ? '' : props.Status;
        this.Recipient = props === undefined ? 0 : props.Recipient;
    }
}
module.exports = {ViewAllNotificationRequest};