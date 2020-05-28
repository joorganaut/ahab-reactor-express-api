const BaseRequest = require('../../contracts/BaseRequest');
class ProcessVTURequest extends BaseRequest{
    constructor(props){
        super(props)
        this.amount = props.amount;
        this.msisdn = props.msisdn;
        this.network = props.network;
        this.Source = props.Source;
    }
}
module.exports = {ProcessVTURequest}