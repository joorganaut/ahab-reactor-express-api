const BaseRequest = require('../../contracts/BaseRequest');
class ResetPinRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.LoginUsername =  props === undefined ? '' :  props.LoginUsername;
    }
}
module.exports = {ResetPinRequest};