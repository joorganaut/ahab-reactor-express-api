const BaseResponse = require('../../contracts/BaseResponse');
class RegisterResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.InstitutionCode = props.InstitutionCode;
    }
}
module.exports = {RegisterResponse}