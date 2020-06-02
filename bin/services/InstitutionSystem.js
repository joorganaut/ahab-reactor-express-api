const BaseSystem = require('./BaseSystem');
const {SecuritySystem} = require('./SecuritySystem');
const {UserSystem} = require('./UserSystem');
const {Institution} = require('../Core/data/Institution');
const {InstitutionModel} = require('../Core/models/data/InstitutionModel');
const {Address} = require('../Core/data/Address');
const {AddressModel} = require('../Core/models/data/AddressModel');
const saltedMd5 = require('salted-md5');
const ValidateInstitutionRequest = require('../Core/models/mobile/ValidateInstitutionRequest').ValidateInstitutionRequest;
const ValidateInstitutionResponse = require('../Core/models/mobile/ValidateInstitutionResponse').ValidateInstitutionResponse;
const RegisterRequest = require('../Core/models/mobile/RegisterRequest').RegisterRequest;
const RegisterResponse = require('../Core/models/mobile/RegisterResponse').RegisterResponse;
class InstitutionSystem extends BaseSystem{
    constructor(response, props) {
        super(props);
        this.response = response;
        this.SecuritySystem = SecuritySystem;
        // this.UserSystem = new UserSystem(response, props);
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
    async CreateInstitutionDetails(request, transaction){
        let result = null;
        let t = BaseSystem.IsNullOrUndefined(transaction)? await this.Sequelize.transaction() : transaction;
        try{
            let institution = new InstitutionModel(request.InstitutionModel);
            institution.Password = saltedMd5(request.InstitutionModel.Password);
            institution.PassPhrase = saltedMd5(request.InstitutionModel.PassPhrase);
            institution.DateCreated = BaseSystem.GetDate(true);
            institution.DateLastModified = BaseSystem.GetDate(true);
            institution.ContactAddress = request.InstitutionModel.ContactAddress;
            let address = null;
            if (!BaseSystem.IsNullOrUndefined(request.CustomerModel.Address)){
                address = new AddressModel(request.CustomerModel.Address);
                address.EntityName = "Institution";
                address.DateCreated = BaseSystem.GetDate(true);
                address.DateLastModified = BaseSystem.GetDate(true);
            }
            await this.Save(Institution, institution, { transaction: t}).then(async inst=>{
                inst.Code = BaseSystem.GetDateAndTime(false) + inst.ID.toString();
                await this.Update(inst, {transaction : t});
                address.InstitutionID = inst.ID;
                address.EntityID = inst.ID;
                await this.Save(Address, address, {transaction : t});
                inst = await this.SecuritySystem.GenerateKeys(inst);
                await this.Update(inst, {transaction : t});
                if(BaseSystem.IsNullOrUndefined(transaction)){
                    (await t).commit();
                }
                if (!BaseSystem.IsNullOrUndefined(inst)){
                        result = inst;
                }else{
                    this.Error = "Unable to create institution details";
                }
            });            
        }
        catch (e)
        {
            this.Error = e;
            (await t).rollback();
        }
        return result;
    }
    async RegisterInstitution(request, response){
        let t = await this.Sequelize.transaction();
        let userSystem = new UserSystem(this.response);
        try{
            //Check if institution Exists using contact email
            let institutionModel = new InstitutionModel(request.InstitutionModel);
            let institution = await this.RetrieveByParameter(Institution, {ContactEmail : institutionModel.ContactEmail});
            if(BaseSystem.IsNullOrUndefined(institution)){
                institution = await this.CreateInstitutionDetails(request, t);
                if(!BaseSystem.IsNullOrUndefined(institution)){
                    let user = await userSystem.CreateIndividualDetails(request, institution, t);
                    if(!BaseSystem.IsNullOrUndefined(user)){
                        (await t).commit();
                        response.InstitutionCode = institution.Code;
                        response.Code = this.Responses.MessageResponse_SUCCESS.Code;
                        response.Message = `${this.Responses.MessageResponse_SUCCESS.Message}`;
                    }else{
                        (await t).rollback();
                        response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                        response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${userSystem.Error}`;
                    }
                }else{
                    (await t).rollback();
                    response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                    response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${this.Error}`;
                }
            }else{
                response.Code = this.Responses.MessageResponse_DUPLICATE_TRANSMISSION.Code;
                response.Message = `${this.Responses.MessageResponse_DUPLICATE_TRANSMISSION.Message}: Institution exists for this email`;
            }
        }catch (e){
            (await t).rollback();
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