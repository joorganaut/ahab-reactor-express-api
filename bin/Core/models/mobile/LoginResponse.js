const BaseResponse = require('../../contracts/BaseResponse');
class LoginResponse extends BaseResponse{
    constructor(...props){
        super(...props)
        this.IsAuthenticated = props.IsAuthenticated;
        this.InstitutionModel = props.InstitutionModel;
        this.AccountModels = props.AccountModels;
        this.UserServiceModel = props.UserServiceModel;
        this.CustomerModel = props.CustomerModel;
    }
}
module.exports = {LoginResponse};