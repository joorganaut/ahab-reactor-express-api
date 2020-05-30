const BaseRequest = require('../../contracts/BaseRequest');
class USSDRequest extends BaseRequest{
    /*{ "command" : "Begin" ,"msisdn" : "2347082331054","serviceCode" : "*371","content" : "*371#","src":"airtel"}*/
    constructor(props){
        super(props);
        this.command = props === undefined ? '' :  props.command;
        this.msisdn =  props === undefined ? '' : props.msisdn;
        this.serviceCode =  props === undefined ? '' : props.serviceCode;
        this.content =  props === undefined ? '' : props.content;
        this.src =  props === undefined ? '' : props.src;
        this.Error =  props === undefined ? '' : props.Error;
    }
}
module.exports = {USSDRequest}