const BaseRequest = require('../../contracts/BaseRequest');
class LoginRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.LoginUsername = props === undefined ? '' :  props.LoginUsername;
        this.Password =  props === undefined ? '' : props.Password;
    }
}
module.exports = {LoginRequest};