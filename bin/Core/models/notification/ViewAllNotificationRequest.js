const {SearchParameter} = require("../CoreBanking/common/SearchParameter");

class ViewAllNotificationRequest extends SearchParameter{
    constructor(props){
        super(props);
        this.Status = props === undefined ? '' : props.Status;
    }
}
module.exports = {ViewAllNotificationRequest};