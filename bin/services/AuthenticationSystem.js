const BaseProcessor = require('./BaseProcessor');
const T = require('../DAO/BusinessObjectDAO');
const jwt = require('jsonwebtoken');
const Response = require('./common/Responses');
class AuthenticationSystem extends BaseProcessor{
    constructor(req, res, next, roles, callback) {
        super(req, res, next, roles, callback);
        this.req = req;
        this.res = res;
        this.next = next;
        this.roles = roles;
        this.callback = callback.bind(this);
        this.error = '';
        this.AuthenticateToken();
    }
    async IsInRole(data){
        let result = false;
        if(this.roles.includes('*'))
        {
            result = true;
            return result;
        }
        return result;
    }
    async IsAuthenticated(data, institutionID){
        let result = true;
        //Set InstitutionID
        return result;
    }
    static async GenerateToken(req, res){
        let response = {
            Expiry : '',
            Code : '',
            Message : '',
            Error : ''
        };
        let result = {};
        try{
            let credentials = req.body;
            result = jwt.sign({
                data: credentials
              }, 'secret', { expiresIn: '1h' });
            response.Token = result;
            response.Expiry = '1h';
            response.Code = Response.MessageResponse_SUCCESS.Code;
            response.Message = Response.MessageResponse_SUCCESS.Message;
        }
        catch(error){
            response.Code = Response.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = Response.MessageResponse_SYSTEM_MALFUNCTION.Message;
            response.Error = error.message;
        }       
        res.send(JSON.stringify(response));
    }
    async AuthenticateToken() {
        let response = {
            Result: {},
            Code: '',
            Message: '',
            Error: null,
            InstitutionID: 0
        };
        let result = {};
        try {
            //Code to decode token
            let request = this.req.headers.authorization;
            if (BaseProcessor.IsNullOrUndefined(request) && !this.roles.includes('*')) {
                response.Result = result;
                response.Code = Response.MessageResponse_AUTHENTICATION_ERROR.Code;
                response.Message = Response.MessageResponse_AUTHENTICATION_ERROR.Message + ' Please provide a token';
                response.error = this.error;
                let processParameters = {
                    req: this.req,
                    res: this.res,
                    Response: response,
                };
                this.callback(processParameters);
            } else if(!this.roles.includes('*')){
                let token = request.split(' ')[1];
                let decode = jwt.verify(token, 'secret');
                let data = decode.data;
                if (this.IsAuthenticated(data, response.InstitutionID) && this.IsInRole(data)) {
                    response.Result = result;
                    response.Code = Response.MessageResponse_SUCCESS.Code;
                    response.Message = Response.MessageResponse_SUCCESS.Message;
                    let processParameters = {
                        req: this.req,
                        res: this.res,
                        Response: response,
                    };
                    this.callback(processParameters);
                } else {
                    response.Result = result;
                    response.Code = Response.MessageResponse_AUTHENTICATION_ERROR.Code;
                    response.Message = Response.MessageResponse_AUTHENTICATION_ERROR.Message;
                    response.error = this.error;
                    let processParameters = {
                        req: this.req,
                        res: this.res,
                        Response: response,
                    };
                    this.callback(processParameters);
                }
            }else{
                response.Result = result;
                response.Code = Response.MessageResponse_SUCCESS.Code;
                response.Message = Response.MessageResponse_SUCCESS.Message;
                let processParameters = {
                    req: this.req,
                    res: this.res,
                    Response: response,
                };
                this.callback(processParameters);
            }
        } catch (error) {
            response.Code = Response.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = Response.MessageResponse_SYSTEM_MALFUNCTION.Message;
            response.Error = error.message;
            let processParameters = {
                req: this.req,
                res: this.res,
                Response: response,
            };
            this.callback(processParameters);
        }
    }
}
module.exports = {AuthenticationSystem};