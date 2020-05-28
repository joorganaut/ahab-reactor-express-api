const BaseRequest = require('../../contracts/BaseRequest');
class RegisterRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.InstitutionModel = props.InstitutionModel;
        this.UserModel = props.UserModel;
        this.CustomerModel = props.CustomerModel;
    }
}
module.exports = {RegisterRequest}