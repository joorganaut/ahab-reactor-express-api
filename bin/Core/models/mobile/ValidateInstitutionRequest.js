const BaseRequest = require('../../contracts/BaseRequest');
class ValidateInstitutionRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.InstitutionCode =  props === undefined ? '' :  props.InstitutionCode;
        this.InstitutionPassword =  props === undefined ? '' :  props.InstitutionPassword;
    }
}
module.exports = {ValidateInstitutionRequest};