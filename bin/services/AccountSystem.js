const {Account} = require('../Core/data/Account');
const {Customer} = require('../Core/data/Customer');
const {Product} = require('../Core/data/Product');
const {DBTransactionParameter} = require('../Core/contracts/DBTransactionParameter');
const {AddAccountRequest} = require('../Core/models/CoreBanking/AddAccountRequest');
const {AddAccountResponse} = require('../Core/models/CoreBanking/AddAccountResponse');
const BaseSystem = require('./BaseSystem');
const {CustomerSystem} = require('./CustomerSystem');
const {ProductSystem} = require('./ProductSystem');
class AccountSystem extends BaseSystem{
    constructor(response, props) {
        super(props);
        this.props = props;
        this.response = response;
    }
    async GenerateAccountNumber(product, accountID) {
        let result = BaseSystem.Empty();
        let number = `${product.ID.toString().padEnd(5, '0')}${accountID.toString().padStart(5, '0')}${(product.IsGLProduct ? 1 : 2)}`;
        result = number + this.UtilitySystem.GenerateLuhnNumber(number);
        return result;
    }
    
    async OpenAccountAsync(){
        let response = new AddAccountResponse(this.response.Response);
        let request = new AddAccountRequest(this.response.req.body);
        if(this.response.Response.Code === '00'){
            response = await this.OpenAccount(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async OpenAccount(request, response){    
    try{
            if (this.BaseProcessor.IsNullOrWhiteSpace(request.Name))
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.ResponsesResponses.MessageResponse_SYSTEM_MALFUNCTION.Message}: Account Name cannot be Blank`;
                return response;
            }
            if (request.CustomerID <= 0)
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Customer ID cannot be Blank`;
                return response;
            }
            let customer = await this.RetrieveByParameter(Customer, {CustomerID : request.CustomerID});
            if (customer == null)
            {
                response.Code = this.Responses.MessageResponse_GENERAL_ERROR.Code;
                response.Message = `${this.Responses.MessageResponse_GENERAL_ERROR.Message}: Unable to retrieve customer with ID: ${request.CustomerID}`;
                return response;
            }
            if (request.ProductID <= 0)
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Response = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: Product ID cannot be Blank`;
                return response;
            }
            let product = await this.RetrieveByParameter(Product, {ProductID : request.ProductID});
            if (product == null)
            {
                response.Code = this.Responses.MessageResponse_GENERAL_ERROR.Code;
                response.Message = `${this.Responses.MessageResponse_GENERAL_ERROR.Message}: Unable to retrieve customer with ID: ${request.ProductID}`;
                return response;
            }
            var existingParameters = {
                CustomerID : request.CustomerID,
                ProductID : request.ProductID
            };
            var existingAccount = await this.RetrieveMany(Account, {existingParameters});
            if (existingAccount !== null && existingAccount.length > 0)
            {
                response.Code = this.Responses.MessageResponse_DUPLICATE_TRANSMISSION.Code;
                response.Message = `${this.Responses.MessageResponse_DUPLICATE_TRANSMISSION.Message}: Account with same Product exists for Customer`;
                return response;
            }
            request.DateCreated = DateTime.Now;
            request.DateLastModified = DateTime.Now;
            request.InstitutionID = Institution.ID;
            let para = [];
            let account = {};
            para.push(new DBTransactionParameter({
                DBAction : this.DBAction.Save.name,
                Action : () => { },
                DBObject : request,
                DBObjectType : Account
            }));
            para.push(new DBTransactionParameter({
                DBAction : this.DBAction.Nothing.name,
                Action : (a) => {account = a; },
                DBObject : request,
                DBObjectType : Account
            }));
            para.push(new DBTransactionParameter({
                DBAction : this.DBAction.Update.name,
                Action : async () => 
                {
                    account.AccountNumber = await this.GenerateAccountNumber(product, account.ID);
                },
                DBObject : account,
                DBObjectType : Account
            }));
             if(!BaseSystem.IsNullOrUndefined(await this.Execute(para)))
            {
                response.AccountNumber = request.AccountNumber;
                response.Code = this.Responses.MessageResponse_SUCCESS .Code;
                response.Message = this.Responses.MessageResponse_SUCCESS.Message;
            }
            else
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${this.Error}`;
            }
        }
        catch (e)
        {
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
        // this.response.res.send(response.ToString());
    }
}
module.exports = {AccountSystem};