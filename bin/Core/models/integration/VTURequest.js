const BaseRequest = require('../../contracts/BaseRequest');
class VTURequest extends BaseRequest{
    constructor(props){
        super(props)
        this.amount = props.amount;
        this.msisdn = props.msisdn;
        this.network = props.network;
        this.email = props.email;
        this.password = props.password;
        this.requestId = props.requestId
    }
}
module.exports = {VTURequest}