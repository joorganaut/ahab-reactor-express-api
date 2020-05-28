const BaseResponse = require('../../contracts/BaseResponse');
class USSDResponse extends BaseResponse{
     /*{ "command" : "Continue" ,"msisdn" : "2347082331054","serviceCode" : "*371","content" : "Welcome
to XYZ service/n1. Register/n2. Optout/n3.Buy
product","src":"airtel"}*/
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
module.exports = {USSDResponse}