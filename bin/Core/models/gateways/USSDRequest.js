const BaseRequest = require('../../contracts/BaseRequest');
class USSDRequest extends BaseRequest{
    /*{ "command" : "Begin" ,"msisdn" : "2347082331054","serviceCode" : "*371","content" : "*371#","src":"airtel"}*/
    constructor(props){
        super(props)
        this.command = props.command;
        this.msisdn = props.msisdn;
        this.serviceCode = props.serviceCode;
        this.content = props.content;
        this.src = props.src;
        this.Error = props.Error
    }
}
module.exports = {USSDRequest}