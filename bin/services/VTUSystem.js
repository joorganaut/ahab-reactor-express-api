const BaseSystem = require('./BaseSystem');
const {PostingSystem} = require('./PostingSystem');
const {VTUProcessor} = require('./VTUProcessor');
const {User} = require('../Core/data/User');
const {Product} = require('../Core/data/Product');
const {Account} = require('../Core/data/Account');
const saltedMd5 = require('salted-md5');
const TopUpMSISDNRequest = require('../Core/models/mobile/TopUpMSISDNRequest').TopUpMSISDNRequest;
const TopUpMSISDNResponse = require('../Core/models/mobile/TopUpMSISDNResponse').TopUpMSISDNResponse;
const {SinglePostRequest} = require('../Core/models/CoreBanking/SinglePostRequest');
const {SinglePostResponse} = require('../Core/models/CoreBanking/SinglePostResponse');
const ValidateUserPinRequest = require('../Core/models/mobile/ValidateUserPinRequest').ValidateUserPinRequest;
const ValidateUserPinResponse = require('../Core/models/mobile/ValidateUserPinResponse').ValidateUserPinResponse;
const FundVTUWalletRequest = require('../Core/models/mobile/FundVTUWalletRequest').FundVTUWalletRequest;
const FundVTUWalletResponse = require('../Core/models/mobile/FundVTUWalletResponse').FundVTUWalletResponse;
class VTUSystem extends BaseSystem{
    constructor(response, props){
        super(props);
        this.response = response;
        this.VTUProcessor = VTUProcessor;
        this.PostingSystem = new PostingSystem(this.response);
        this.VTUProduct = this.RetrieveByParameter(Product, {});
    }
    async TopUpMSISDN(request, response){
        try{
            let v_response = await this.VTUProcessor.Execute(request);
            response.Code = v_response.Code;
            response.Message = v_response.Message;
        }catch(e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async TopUpMSISDNAsync(){
        let request = new TopUpMSISDNRequest(this.response.req.body);
        let response = new TopUpMSISDNResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.TopUpMSISDN(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ValidateTransactionPin(request, response){
        try{
            let usr = await this.Get(User, request.UserID);
            if(BaseSystem.IsNullOrUndefined(usr)){
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${'Unable to retrieve user'}`;
            }
            else{
                console.log(JSON.stringify(usr))
                if(usr.TransactionPin === saltedMd5(request.Pin)){
                    response.Code = this.Responses.MessageResponse_SUCCESS.Code;
                    response.Message = `${this.Responses.MessageResponse_SUCCESS.Message}`;
                }else{
                    response.Code = this.Responses.MessageResponse_AUTHENTICATION_ERROR.Code;
                    response.Message = `${this.Responses.MessageResponse_AUTHENTICATION_ERROR.Message}: ${'Invalid Pin'}`;
                }
            }
        }catch(e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async ValidateTransactionPinAsync(){
        let request = new ValidateUserPinRequest(this.response.req.body);
        let response = new ValidateUserPinResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.ValidateTransactionPin(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async FundVTUWallet(request, response){
        try{
            let p = {ExpenseAccount : "100000000123"}; //retrieve product expense account
            let debitAccount = await this.RetrieveByParameter(Account, {AccountNumber : p.ExpenseAccount});
            if(BaseSystem.IsNullOrUndefined(debitAccount)){
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${'Unable to retrieve Expense Account'}`;
            }
            let postRequest = new SinglePostRequest(
            {
                Amount : request.Amount,
                CreditAccount : request.AccountNumber,
                DebitAccount : debitAccount.AccountNumber,
                Narration : `VTU Funding of User ${request.VTUUserID}`,
                InstitutionCode : request.InstitutionCode
            });
            let postingResponse = await this.PostingSystem.SinglePost(postRequest, response);
            response.ResponseCode = postingResponse.ResponseCode;
            response.ResponseMessage = postingResponse.ResponseMessage;
        }catch(e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async FundVTUWalletAsync(){
        let request = new FundVTUWalletRequest(this.response.req.body);
        let response = new FundVTUWalletResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.FundVTUWallet(request, response);
        }
        this.response.res.send(response.ToString());
    }
}
module.exports = {VTUSystem};