const BaseResponse = require('../../contracts/BaseResponse');
class IndividualRegisterResponse extends BaseResponse{
    constructor(...props){
        super(...props);
        this.InstitutionCode = props === undefined ? '' :  props.InstitutionCode;
    }
}
module.exports = {IndividualRegisterResponse};