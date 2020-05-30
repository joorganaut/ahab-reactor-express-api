const BaseRequest = require('../../contracts/BaseRequest');
class ProcessPinRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Pin =   props === undefined ? '' : props.Pin;
        this.MSISDN =   props === undefined ? '' : props.MSISDN;
        this.Network =  props === undefined ? '' :  props.Network;
    }
}
module.exports = {ProcessPinRequest};