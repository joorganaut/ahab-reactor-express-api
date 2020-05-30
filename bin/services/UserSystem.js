const {User} = require('../Core/data/User');
const {Institution} = require('../Core/data/Institution');
const {Customer} = require('../Core/data/Customer');
const {Address} = require('../Core/data/Address');
const {Account} = require('../Core/data/Account');
const {InstitutionModel} = require('../Core/models/data/InstitutionModel');
const {AccountModel} = require('../Core/models/data/AccountModel');
const {CustomerModel} = require('../Core/models/data/CustomerModel');
const {UserModel} = require('../Core/models/data/UserModel');
const {AddressModel} = require('../Core/models/data/AddressModel');
const BaseSystem = require('./BaseSystem');
const saltedMd5 = require('salted-md5');
const {DBTransactionParameter} = require('../Core/contracts/DBTransactionParameter');
const {InstitutionSystem} = require('./InstitutionSystem');
const {CustomerSystem} = require('./CustomerSystem');
const {AccountSystem} = require('./AccountSystem');
const LoginRequest = require('../Core/models/mobile/LoginRequest').LoginRequest;
const LoginResponse = require('../Core/models/mobile/LoginResponse').LoginResponse;
const ChangePasswordRequest = require('../Core/models/mobile/ChangePasswordRequest').ChangePasswordRequest;
const ChangePasswordResponse = require('../Core/models/mobile/ChangePasswordResponse').ChangePasswordResponse;
const ChangePinRequest = require('../Core/models/mobile/ChangePinRequest').ChangePinRequest;
const ChangePinResponse = require('../Core/models/mobile/ChangePinResponse').ChangePinResponse;
const ResetPasswordRequest = require('../Core/models/mobile/ResetPasswordRequest').ResetPasswordRequest;
const ResetPasswordResponse = require('../Core/models/mobile/ResetPasswordResponse').ResetPasswordResponse;
const ResetPinRequest = require('../Core/models/mobile/ResetPinRequest').ResetPinRequest;
const ResetPinResponse = require('../Core/models/mobile/ResetPinResponse').ResetPinResponse;
const IndividualRegisterRequest = require('../Core/models/mobile/IndividualRegisterRequest').IndividualRegisterRequest;
const IndividualRegisterResponse = require('../Core/models/mobile/IndividualRegisterResponse').IndividualRegisterResponse;

class UserSystem extends BaseSystem{
    constructor(response, props){
        super(props);
        this.response = response;
        this.InstitutionSystem = new InstitutionSystem(response, props);
        this.CustomerSystem = new CustomerSystem(response, props);
        this.AccountSystem = new AccountSystem(response, props);
    }
    
    async Login(request, response){
        try{
            let institution = await this.RetrieveByParameter(Institution, {Code: request.InstitutionCode});
            if (institution == null)
            {
                response.Code = this.Responses.MessageResponse_GENERAL_ERROR.Code;
                response.Message = `${this.Responses.MessageResponse_GENERAL_ERROR.Message}: Unable to retrieve Institution with Code: ${request.InstitutionCode}`;
                return response;
            }
            let usr = await this.RetrieveByParameter(User, {Username : request.LoginUsername});
            if (usr == null)
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Cannot find any User with username: ${request.LoginUsername} for Institution `;
                return response;
            }
            let md5Password = saltedMd5(request.Password);
            if (usr.Password != md5Password)
            {
                response.Code = this.Responses.MessageResponse_AUTHENTICATION_ERROR.Code;
                response.ResponseMessage = `${this.Responses.MessageResponse_AUTHENTICATION_ERROR.Message}`;
                return response;
            }
            
            response.InstitutionModel = new InstitutionModel(institution);
            let customer = await this.RetrieveByParameter(Customer, {UserID : usr.ID});
            if (customer !== null)
            {
                let customerAccounts = await this.AccountSystem.RetrieveMany({CustomerID : customer.ID});
                response.AccountModels.push(customerAccounts.filter(x =>
                {
                    return new AccountModel(x);
                }));
                response.CustomerModel = new CustomerModel(customer);
            }
            else
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: Unable to retrieve Customer`;
                return response;
            }
            response.UserServiceModel = new UserModel(usr);
            usr.LastLoginDate = BaseSystem.GetDate(true);
            response.IsAuthenticated = true;
            if (!BaseSystem.IsNullOrUndefined(await this.Update(usr)))
            {
                //TODO: add validation and send email
                response.Code = this.Responses.MessageResponse_SUCCESS.Code;
                response.Message = `${this.Responses.MessageResponse_SUCCESS.Message}`;
            }
            else
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${this.Error}`;
            }
        }catch(e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async LoginAsync(){
        let request = new LoginRequest(this.response.req.body);
        let response = new LoginResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.Login(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ChangePassword(request, response){
        try
            {
                //UserSystem = new UserSystem()
                let usr = await this.RetrieveByParameter(User, {Username : request.LoginUsername});
                if (this.BaseProcessor.IsNullOrUndefined(usr))
                {
                    response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                    response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Cannot find any User with username: ${request.LoginUsername} for Institution `;
                    return response;
                }
                let md5Password = saltedMd5(request.OldPassword);
                if (usr.Password != md5Password)
                {
                    response.Code = this.Responses.MessageResponse_AUTHENTICATION_ERROR.Code;
                    response.Message = `${this.Responses.MessageResponse_AUTHENTICATION_ERROR.Message}`;
                    return response;
                }
                usr.Password = saltedMd5(request.NewPassword);
                usr.DateLastModified = this.BaseProcessor.GetDate(true);
                usr.ForcePasswordChange = false;
                if (!BaseSystem.IsNullOrUndefined(await this.Update(usr)))
                {
                    response.Code = this.Responses.MessageResponse_SUCCESS.Code;
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
    }
    async ChangePasswordAsync(){
        let request = new ChangePasswordRequest(this.response.req.body);
        let response = new ChangePasswordResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.ChangePassword(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ChangePin(request, response){
        try
        {
            //UserSystem = new UserSystem()
            let usr = await this.RetrieveByParameter(User, {Username : request.LoginUsername});
            if (this.BaseProcessor.IsNullOrUndefined(usr))
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Cannot find any User with username: ${request.LoginUsername} for Institution `;
                return response;
            }
            let md5Password = saltedMd5(request.OldPin);
            if (usr.TransactionPin != md5Password)
            {
                response.Code = this.Responses.MessageResponse_AUTHENTICATION_ERROR.Code;
                response.Message = `${this.Responses.MessageResponse_AUTHENTICATION_ERROR.Message}`;
                return response;
            }
            usr.TransactionPin = saltedMd5(request.NewPin);
            usr.DateLastModified = this.BaseProcessor.GetDate(true);
            usr.ForcePinChange = false;
            if (!BaseSystem.IsNullOrUndefined(await this.Update(usr)))
            {
                response.Code = this.Responses.MessageResponse_SUCCESS.Code;
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
    }
    async ChangePinAsync(){
        let request = new ChangePinRequest(this.response.req.body);
        let response = new ChangePinResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.ChangePin(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ResetPin(request, response){
        try{
            let user = await this.RetrieveByParameter(User, {Username : request.LoginUsername});
            user = new UserModel(
            {
                Username : "sazeespectra@gmail.com",
                Email : "sazeespectra@gmail.com",
                FullName : "Test User",
            });
            if (user !== null)
            {
                //generate temp password
                user.TransactionPin = await this.UtilitySystem.GenerateTempPin();
                user.ForcePinChange = true;
                //Send mail to User with the temp password
            }
            else
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Invalid User Details`;
            }
        }
        catch (e)
        {
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async ResetPinAsync(){
        let request = new ResetPinRequest(this.response.req.body);
        let response = new ResetPinResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.ResetPin(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ResetPassword(request, response){
        try{
                let user = await this.RetrieveByParameter(User, {Username : request.LoginUsername});
                user = new UserModel(
                {
                    Username : "sazeespectra@gmail.com",
                    Email : "sazeespectra@gmail.com",
                    FullName : "Test User",
                });
                if (user !== null)
                {
                    //generate temp password
                    user.Password = await this.UtilitySystem.GenerateTempPassword();
                    user.ForcePasswordChange = true;
                    //Send mail to User with the temp password
                }
                else
                {
                    response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                    response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message}: Invalid User Details`;
                }
            }
            catch (e)
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
            }
        return response;
    }
    async ResetPasswordAsync(){
        let request = new ResetPasswordRequest(this.response.req.body);
        let response = new ResetPasswordResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.ResetPassword(request, response);
        }
        this.response.res.send(response.ToString());
    }

    async CreateIndividualDetails(request, institution)
    {
        let result = null;
        let t = await this.Sequelize.transaction();
        let VTUProducts = {ID : 1, IsGLProduct : false};//Remember to retrieve actual product
        try
        {
            
            //Create Institution User
            let user = new UserModel(request.UserModel);
            user.Password = saltedMd5(request.UserModel.Password);
            user.TransactionPin = saltedMd5(request.UserModel.TransactionPin);
            user.DateCreated = BaseSystem.GetDate(true);
            user.DateLastModified = BaseSystem.GetDate(true);
            user.InstitutionCode = institution.Code;
            user.InstitutionID = institution.ID;
            //Create Institution Customer
            let customer = new CustomerModel(request.CustomerModel);
            customer.DateCreated = BaseSystem.GetDate(true);
            customer.DateLastModified = BaseSystem.GetDate(true);
            customer.InstitutionID = institution.ID;
            customer.InstitutionCode = institution.Code;

            //Validate bvn
            let address = new AddressModel(request.CustomerModel.Address);
            let para = [];
            let executingObject = {};
            
            let theUser = await this.Save(User, user, { transaction: t}).then(async res=>{
                customer.UserID = res.ID;
                await this.Save(Customer, customer, { transaction: t}).then(async cus=>{
                    address.EntityID = cus.ID;
                    address.EntityName = "Customer";
                    address.DateCreated = BaseSystem.GetDate(true);
                    address.DateLastModified = BaseSystem.GetDate(true);
                    await this.Save(Address, address, { transaction: t});
                    let account = new AccountModel({
                        //account.Name = institution.Code + "_" + account.ID + "_VTU Wallet";
                        DateCreated : BaseSystem.GetDate(true),
                        DateLastModified : BaseSystem.GetDate(true),
                        CustomerID : cus.ID,
                        IsGLProduct : VTUProducts.IsGLProduct,
                        ProductID : VTUProducts.ID});
                    await this.Save(Account, account, { transaction: t}).then(async acc=>{
                        await this.AccountSystem.GenerateAccountNumber(VTUProducts, acc.ID).then(accountNumber=>{
                            acc.AccountNumber = accountNumber;
                        });
                        acc.Name = institution.Code + "_" + acc.ID + "_VTU Wallet";
                        await this.Update(acc, { transaction: t});
                    });
                });                
                (await t).commit();
                if (!BaseSystem.IsNullOrUndefined(res))
                {
                    result = res;
                }
                else
                {
                    this.Error = "Unable to create institution/user/customer/account details";
                }
                return result;
            });
            
            
            
            /*
            para.push(new DBTransactionParameter(
            {
                DBAction : this.DBAction.Save.name,
                Action : (a, callback) => { callback(a); },
                DBObject : user,
                DBObjectType : User
            }));
            para.push(new DBTransactionParameter(
            {
                DBAction : this.DBAction.Save.name,
                Action : (a, callback) => {
                    executingObject = a;
                    customer.UserID = executingObject.ID;
                    callback(a);
                },
                DBObject : customer,
                DBObjectType : Customer
            }));
            para.push(new DBTransactionParameter(
            {
                DBAction : this.DBAction.Save.name,
                Action : (a, callback) =>
                {
                    executingObject = a;
                    address.EntityID = executingObject.ID;
                    address.EntityName = "Customer";
                    address.DateCreated = BaseSystem.GetDate(true);
                    address.DateLastModified = BaseSystem.GetDate(true);
                    callback(a);
                },
                DBObject : address,
                DBObjectType : Address
            }));
            let account = new AccountModel({
            //account.Name = institution.Code + "_" + account.ID + "_VTU Wallet";
            DateCreated : BaseSystem.GetDate(true),
            DateLastModified : BaseSystem.GetDate(true),
            CustomerID : executingObject.ID,
            ProductID : VTUProducts.ID});
            para.push(new DBTransactionParameter(
            {
                DBAction : this.DBAction.Save.name,
                Action : (a, callback) =>
                {
                    callback(a);
                },
                DBObject : account,
                DBObjectType : Account
            }));
            para.push(new DBTransactionParameter(
            {
                DBAction : this.DBAction.Update.name,
                Action : (a, callback) =>
                {
                    executingObject = a;
                    this.AccountSystem.GenerateAccountNumber(VTUProducts, executingObject.ID).then(res=>{
                        executingObject.AccountNumber = res;
                    });
                    executingObject.Name = institution.InstitutionCode + "_" + executingObject.ID + "_VTU Wallet";
                    callback(a);
                },
                DBObject : executingObject,
                DBObjectType : Account
            }));
            para.push(new DBTransactionParameter(
            {
                DBAction : this.DBAction.Update.name,
                Action : (a, callback) => {
                    //Generate activation url
                    let url = BaseSystem.Empty();
                    var cipher = saltedMd5(`${theUser.ID}`);
                    let baseUrl = `/MobileMiddleware/Registration/ActivateAccount?request={cipher}&id=${institution.ID}`;
                    theUser.ActivationLink = baseUrl;
                    thisUser.where = thisUser.ID;
                    callback(a);
                },
                DBObject : theUser,
                DBObjectType : User,
            }));*/
            
        }
        catch (e)
        {
            this.Error = e;
            (await t).rollback();
        }
        //return result;
    }

    async RegisterIndividual(request, response){
        try
            {
                //Validate institution
                let code = request.InstitutionCode;
                let password = request.InstitutionPassword;
                let institution = await this.InstitutionSystem.ValidateInstitution(code, password);
                institution = {ID : 1, Code : '1223334444', Name : 'Test Institution', ShortName : 'TI'};
                if (institution !== null)
                {
                    //Create Institution details
                    let user = await this.CreateIndividualDetails(request, institution);
                    if (user !== null)
                    {
                        //await SendWelcomeMail(institution, user);
                        response.Code = this.Responses.MessageResponse_SUCCESS.Code;
                        response.Message = `${this.Responses.MessageResponse_SUCCESS.Message}`;
                    }
                    else
                    {
                        response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                        response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${this.Error}`;
                    }
                }
                else
                {
                    response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                    response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: Invalid Institution details`;
                }
            }
            catch (e)
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
            }
        return response;
    }
    async RegisterIndividualAsync(){
        let request = new IndividualRegisterRequest(this.response.req.body);
        let response = new IndividualRegisterResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.RegisterIndividual(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ActivateAccount(){
        this.response.res.redirect(200, 'AccountActivated');
    }
    
}
module.exports = {UserSystem};