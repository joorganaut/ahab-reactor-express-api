const BaseRequest = require('../../contracts/BaseRequest');
class ValidateUserPinRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Pin =  props === undefined ? '' :  props.Pin;
    }
}
module.exports = {ValidateUserPinRequest};