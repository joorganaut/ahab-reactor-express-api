const BaseRequest = require('../../contracts/BaseRequest');
class IndividualRegisterRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.InstitutionPassword = props.InstitutionPassword;
        this.UserModel = props.UserModel;
        this.CustomerModel = props.CustomerModel;
    }
}
module.exports = {IndividualRegisterRequest};
/*
public string InstitutionCode { get; set; }
        public string InstitutionPassword { get; set; }
        public UserModel UserModel { get; set; }
        public CustomerModel CustomerModel { get; set; }
*/