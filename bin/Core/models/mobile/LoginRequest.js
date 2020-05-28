const BaseRequest = require('../../contracts/BaseRequest');
class LoginRequest extends BaseRequest{
    constructor(...props){
        super(...props)
        this.LoginUsername = props.LoginUsername;
        this.Password = props.Password;
    }
}
module.exports = {LoginRequest};