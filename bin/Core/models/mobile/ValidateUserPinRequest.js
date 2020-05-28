const BaseRequest = require('../../contracts/BaseRequest');
class ValidateUserPinRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.Pin = props.Pin;
    }
}
module.exports = {ValidateUserPinRequest}