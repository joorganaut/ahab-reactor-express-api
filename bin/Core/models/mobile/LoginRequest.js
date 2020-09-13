const BaseRequest = require('../../contracts/BaseRequest');
class LoginRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.LoginUsername = props === undefined ? '' :  props.LoginUsername;
        this.Password =  props === undefined ? '' : props.Password;
        this.FirstName = props === undefined ? '' : props.FirstName;
        this.LastName = props === undefined ? '' : props.LastName;
        this.Mobile = props === undefined ? '' : props.Mobile;
    }
}
module.exports = {LoginRequest};