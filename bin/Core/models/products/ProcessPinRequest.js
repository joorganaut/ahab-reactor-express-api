const BaseRequest = require('../../contracts/BaseRequest');
class ProcessPinRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.Pin = props.Pin;
        this.MSISDN = props.MSISDN;
        this.Network = props.Network;
    }
}
module.exports = {ProcessPinRequest}