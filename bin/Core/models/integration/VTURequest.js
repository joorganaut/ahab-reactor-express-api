const BaseRequest = require('../../contracts/BaseRequest');
class VTURequest extends BaseRequest{
    constructor(props){
        super(props);
        this.amount =  props === undefined ? '' : props.amount;
        this.msisdn =  props === undefined ? '' : props.msisdn;
        this.network =  props === undefined ? '' : props.network;
        this.email =  props === undefined ? '' : props.email;
        this.password =  props === undefined ? '' : props.password;
        this.requestId =  props === undefined ? '' : props.requestId;
    }
}
module.exports = {VTURequest}