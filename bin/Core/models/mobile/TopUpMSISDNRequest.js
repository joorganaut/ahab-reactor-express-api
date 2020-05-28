/*
public decimal amount { get; set; }
        public string msisdn { get; set; }
        public string network { get; set; }
        ProcessVTURequest
*/
const BaseRequest = require('../../contracts/BaseRequest');
class TopUpMSISDNRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.amount = props.amount;
        this.msisdn = props.msisdn;
        this.network = props.network;
    }
}
module.exports = {TopUpMSISDNRequest}