const BaseRequest = require('../../contracts/BaseRequest');
class ValidateInstitutionRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.InstitutionCode = props.InstitutionCode;
        this.InstitutionPassword = props.InstitutionPassword;
    }
}
module.exports = {ValidateInstitutionRequest};