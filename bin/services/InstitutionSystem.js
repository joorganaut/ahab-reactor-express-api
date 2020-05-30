const BaseSystem = require('./BaseSystem');
const {Institution} = require('../Core/data/Institution');
const saltedMd5 = require('salted-md5');
const ValidateInstitutionRequest = require('../Core/models/mobile/ValidateInstitutionRequest').ValidateInstitutionRequest;
const ValidateInstitutionResponse = require('../Core/models/mobile/ValidateInstitutionResponse').ValidateInstitutionResponse;
const RegisterRequest = require('../Core/models/mobile/RegisterRequest').RegisterRequest;
const RegisterResponse = require('../Core/models/mobile/RegisterResponse').RegisterResponse;
class InstitutionSystem extends BaseSystem{
    constructor(response, props) {
        super(props);
        this.response = response;
    }
    async ValidateInstitution(code, password) {
        let thisInstitution = null;
        try {
            thisInstitution = await this.RetrieveByParameter(Institution, {
                Code: code
            });
            if (thisInstitution === null) {
                thisInstitution = null;
                this.Error = "Invalid Institution Code";
                return thisInstitution;
            }
            if (thisInstitution.Password !== saltedMd5(password)) {
                thisInstitution = null;
                this.Error = "Invalid Authentication";
                return thisInstitution;
            } else if (thisInstitution.IsEnabled === false) {
                thisInstitution = null;
                this.Error = "Institution is disabled";
                return thisInstitution;
            }
        } catch (e) {
            this.Error = e.message;
        }
        return thisInstitution;
    }
    async AuthenticateInstitution(request, response){
        try{
            if (this.BaseProcessor.IsNullOrWhiteSpace(request.InstitutionCode) || this.BaseProcessor.IsNullOrWhiteSpace(request.InstitutionPassword) )
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.ResponsesResponses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Institution details cannot be Blank`;
                return response;
            }
            let institution = await this.ValidateInstitution(request.InstitutionCode, request.InstitutionPassword);
            if (this.BaseProcessor.IsNullOrUndefined(institution))
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Institution Code or Password incorrect`;
                return response;
            }
            response.Code = this.Responses.MessageResponse_SUCCESS.Code;
            response.Message = this.Responses.MessageResponse_SUCCESS.Message;
        }
        catch(e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async AuthenticateInstitutionAsync(){
        let response = new ValidateInstitutionResponse(this.response.Response);
        let request = new ValidateInstitutionRequest(this.response.req.body);
        if(this.response.Response.Code === '00'){
            response = await this.AuthenticateInstitution(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async RegisterInstitution(request, response){
        try{
            wel.come();//remember to remove
        }catch (e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async RegisterInstitutionAsync(){
        let response = new RegisterResponse(this.response.Response);
        let request = new RegisterRequest(this.response.req.body);
        if(this.response.Response.Code === '00'){
            response = await this.RegisterInstitution(request, response);
        }
        this.response.res.send(response.ToString());
    }
}
module.exports = {InstitutionSystem};