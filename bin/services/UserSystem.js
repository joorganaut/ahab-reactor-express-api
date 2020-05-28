const Responses = require('./common/Responses');
const T = require('../DAO/BusinessObjectDAO')
const LoginRequest = require('../Core/models/mobile/LoginRequest').LoginRequest;
const LoginResponse = require('../Core/models/mobile/LoginResponse').LoginResponse;
const ChangePasswordRequest = require('../Core/models/mobile/ChangePasswordRequest').ChangePasswordRequest;
const ChangePasswordResponse = require('../Core/models/mobile/ChangePasswordResponse').ChangePasswordResponse;
const ResetPasswordRequest = require('../Core/models/mobile/ResetPasswordRequest').ResetPasswordRequest;
const ResetPasswordResponse = require('../Core/models/mobile/ResetPasswordResponse').ResetPasswordResponse;
const IndividualRegisterRequest = require('../Core/models/mobile/IndividualRegisterRequest').IndividualRegisterRequest;
const IndividualRegisterResponse = require('../Core/models/mobile/IndividualRegisterResponse').IndividualRegisterResponse;

class UserSystem{
    constructor(response){
        this.response = response;
    }

    async Login(){
        let request = new LoginRequest(this.response.req.body);
        let response = new LoginResponse();
        this.response.res.send(response.ToString())
    }
    async ChangePassword(){
        let request = new ChangePasswordRequest(this.response.req.body);
        let response = new ChangePasswordResponse();
        this.response.res.send(response.ToString())
    }
    async ResetPassword(){
        let request = new ResetPasswordRequest(this.response.req.body);
        let response = new ResetPasswordResponse();
        this.response.res.send(response.ToString())
    }
    async RegisterIndividual(){
        let request = new IndividualRegisterRequest(this.response.req.body);
        let response = new IndividualRegisterResponse();
        this.response.res.send(response.ToString())
    }
    async ActivateAccount(){
        this.response.res.redirect(200, 'AccountActivated')
    }
    
}
module.exports = {UserSystem};