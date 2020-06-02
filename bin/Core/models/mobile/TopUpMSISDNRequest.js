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
        this.amount =  props === undefined ? 0 :  props.amount;
        this.msisdn =  props === undefined ? '' :  props.msisdn;
        this.network =  props === undefined ? '' :  props.network;
        this.source = props === undefined ? '' : props.source;
    }
}
module.exports = {TopUpMSISDNRequest};