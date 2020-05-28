const BaseRequest = require('../../contracts/BaseRequest');
class ResetPasswordRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.LoginUsername = props.LoginUsername;
    }
}
module.exports = {ResetPasswordRequest}