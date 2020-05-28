const Responses = require('../Services/common/responses');
const T = require('../DAO/BusinessObjectDAO')
const ValidateInstitutionRequest = require('../Core/models/mobile/ValidateInstitutionRequest').ValidateInstitutionRequest;
const ValidateInstitutionResponse = require('../Core/models/mobile/ValidateInstitutionResponse').ValidateInstitutionResponse;
const RegisterRequest = require('../Core/models/mobile/RegisterRequest').RegisterRequest;
const RegisterResponse = require('../Core/models/mobile/RegisterResponse').RegisterResponse;
class InstitutionSystem{
    constructor(response) {
        this.response = response;
        this.error = '';
    }
    async AuthenticateInstitution(){
        let response = new ValidateInstitutionResponse();
        let request = new ValidateInstitutionRequest(response.req.body);
        this.response.res.send(response.ToString());
    }
    async RetrieveAllInstitutions(){
        let response = {};
        this.response.res.send(JSON.stringify(response));
    }
    async RegisterInstitution(){
        let response = new RegisterResponse();
        let request = new RegisterRequest(response.req.body);
        this.response.res.send(response.ToString());
    }
}
module.exports = {InstitutionSystem};