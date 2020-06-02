const BaseRequest = require('../../contracts/BaseRequest');
class ProcessVTURequest extends BaseRequest{
    constructor(props){
        super(props);
        this.amount =   props === undefined ? 0 : props.amount;
        this.msisdn =   props === undefined ? '' : props.msisdn;
        this.network =   props === undefined ? '' : props.network;
        this.source =   props === undefined ? '' : props.source;
    }
}
module.exports = {ProcessVTURequest};