const {User} = require('../Core/data/User');
const {BusinessImage} = require('../Core/data/BusinessImage');
const {Institution} = require('../Core/data/Institution');
const {Customer} = require('../Core/data/Customer');
const {Address} = require('../Core/data/Address');
const {Account} = require('../Core/data/Account');
const {InstitutionModel} = require('../Core/models/data/InstitutionModel');
const {AccountModel} = require('../Core/models/data/AccountModel');
const {CustomerModel} = require('../Core/models/data/CustomerModel');
const {UserModel} = require('../Core/models/data/UserModel');
const {BusinessImageModel} = require('../Core/models/data/BusinessImageModel');
const {AddressModel} = require('../Core/models/data/AddressModel');
const BaseSystem = require('./BaseSystem');
const saltedMd5 = require('salted-md5');
const {DBTransactionParameter} = require('../Core/contracts/DBTransactionParameter');
const {CustomerSystem} = require('./CustomerSystem');
const {AccountSystem} = require('./AccountSystem');
const {SecuritySystem} = require('./SecuritySystem');
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
        //this.InstitutionSystem = new InstitutionSystem(response, props);
        this.CustomerSystem = new CustomerSystem(response, props);
        this.AccountSystem = new AccountSystem(response, props);
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
    async Login(request, response){
        try{
            let institution = await this.RetrieveByParameter(Institution, {Code: request.InstitutionCode});
            if (institution === null)
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
            console.log('::password '+usr.Password);
            if (usr.Password != md5Password)
            {
                response.Code = this.Responses.MessageResponse_AUTHENTICATION_ERROR.Code;
                response.Message = `${this.Responses.MessageResponse_AUTHENTICATION_ERROR.Message}`;
                return response;
            }
            
            response.InstitutionModel = new InstitutionModel(institution);
            let customer = await this.RetrieveByParameter(Customer, {UserID : usr.ID});
            if (customer !== null)
            {
                let customerAccounts = await this.RetrieveMany(Account, {CustomerID : customer.ID});
                response.AccountModels = [];
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
                usr.Password = null;
                usr.TransactionPin = null;
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${this.Error}`;
            }
        }catch(e){
            response.InstitutionModel = null;
            response.UserModel = null;
            response.CustomerModel = null;
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async GoogleLogin(request, response){
        try{
            let institution = await this.RetrieveByParameter(Institution, {Code: request.InstitutionCode});
            if (institution === null)
            {
                response.Code = this.Responses.MessageResponse_GENERAL_ERROR.Code;
                response.Message = `${this.Responses.MessageResponse_GENERAL_ERROR.Message}: Unable to retrieve Institution with Code: ${request.InstitutionCode}`;
                return response;
            }
            let usr = await this.RetrieveByParameter(User, {Username : request.LoginUsername});
            if (usr === null)
            {
                //TODO: create new user using register user
                const userModel = new UserModel({
                    Username: request.LoginUsername,
                    FirstName: request.FirstName,
                    LastName: request.LastName,
                    Password: request.Password,
                    Email: request.LoginUsername,
                    PhoneNumber: request.Mobile,
                    IsAuthenticated: true,
                    LastLoginDate: new Date(),
                });
                const customerModel = new CustomerModel({
                    FirstName: request.FirstName,
                    LastName: request.LastName,
                    OtherName: request.FirstName,
                    PhoneNumber: request.Mobile,
                    Email: request.LoginUsername,
                    Address: new AddressModel()
                });
                request.UserModel = userModel;
                request.CustomerModel = customerModel;
                const registerResponse = await this.RegisterIndividualWithGoogle(request, response, institution);
                usr = registerResponse.user;
                response = registerResponse.response;
            }
            
            response.InstitutionModel = new InstitutionModel(institution);
            let customer = await this.RetrieveByParameter(Customer, {UserID : usr.ID});
            if (customer !== null)
            {
                let customerAccounts = await this.RetrieveMany(Account, {CustomerID : customer.ID});
                response.AccountModels = [];
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
                usr.Password = null;
                usr.TransactionPin = null;
                response.Code = this.Responses.MessageResponse_SUCCESS.Code;
                response.Message = `${this.Responses.MessageResponse_SUCCESS.Message}`;
            }
            else
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${this.Error}`;
            }
        }catch(e){
            response.InstitutionModel = null;
            response.UserModel = null;
            response.CustomerModel = null;
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async LoginAsync(){
        let request = new LoginRequest(this.response.req.body);
        let response = new LoginResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            console.log('::before '+JSON.stringify(response));
            response = await this.Login(request, response);
            console.log('::after '+JSON.stringify(response));
        }
        this.response.res.send(response.ToString());
    }

    async GoogleLoginAsync(){
        let request = new LoginRequest(this.response.req.body);
        let response = new LoginResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            console.log('::before '+JSON.stringify(response));
            response = await this.GoogleLogin(request, response);
            console.log('::after '+JSON.stringify(response));
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
            // user = new UserModel(
            // {
            //     Username : "sazeespectra@gmail.com",
            //     Email : "sazeespectra@gmail.com",
            //     FullName : "Test User",
            // });
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
                // user = new UserModel(
                // {
                //     Username : "sazeespectra@gmail.com",
                //     Email : "sazeespectra@gmail.com",
                //     FullName : "Test User",
                // });
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
    async CreateIndividualDetails(request, institution, transaction)
    {
        let result = null;
        let t = BaseSystem.IsNullOrUndefined(transaction)? await this.Sequelize.transaction() : transaction;
        let VTUProducts = {ID : 1, IsGLProduct : false};//Remember to retrieve actual product
        try
        {
            //Create Institution User
            let user = new UserModel(request.UserModel);
            let usr = await this.RetrieveByParameter(User, {Username : user.Email});
            if(!BaseSystem.IsNullOrUndefined(usr)){
                this.Error = "User with same email exists";
                return null;
            }
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
            await this.Save(User, user, { transaction: t}).then(async res=>{
                customer.UserID = res.ID;
                let businessImage = new BusinessImageModel({
                    ImageString : user.ProfileImage,
                    ImageEntityID : res.ID,
                    ImageEntity : 'User'
                });
                await this.Save(BusinessImage, businessImage, {transaction : t});
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
                        CurrencyID : 1,
                        Currency : 'NGN',
                        ProductID : VTUProducts.ID});
                    await this.Save(Account, account, { transaction: t}).then(async acc=>{
                        await this.AccountSystem.GenerateAccountNumber(VTUProducts, acc.ID).then(accountNumber=>{
                            acc.AccountNumber = accountNumber;
                        });
                        acc.Name = institution.Code + "_" + acc.ID + "_VTU Wallet";
                        await this.Update(acc, { transaction: t});
                    });
                    let url = this.response.req.headers.host;
                    var cipher = await SecuritySystem.Encrypt(`${res.ID}`, institution);
                    let baseUrl = `${url}/api/MobileMiddleware/Registration/ActivateAccount?request=${cipher}&id=${institution.ID}`;
                    res.ActivationLink = baseUrl;
                    await this.Update(res, { transaction: t});
                });  
                if(BaseSystem.IsNullOrUndefined(transaction)){
                    (await t).commit();
                }
                if (!BaseSystem.IsNullOrUndefined(res))
                {
                    result = res;
                }
                else
                {
                    this.Error = "Unable to create institution/user/customer/account details";
                }
                //return result;
            });            
        }
        catch (e)
        {
            this.Error = e;
            (await t).rollback();
        }
        return result;
    }

    async RegisterIndividual(request, response){
        try
            {
                //Validate institution
                let code = request.InstitutionCode;
                let password = request.InstitutionPassword;
                let institution = await this.ValidateInstitution(code, password);
                //institution = {ID : 1, Code : '1223334444', Name : 'Test Institution', ShortName : 'TI'};
                if (institution !== null || skipInstitutionValidation)
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

    async RegisterIndividualWithGoogle(request, response, institution){
        let user = null;
        try
            {
                user = await this.CreateIndividualDetails(request, institution);
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
            catch (e)
            {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
            }
        return {response, user};
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
        let query = this.response.req.query;
        let institution = await this.RetrieveByParameter(Institution, {ID : query.id});
        if(!BaseSystem.IsNullOrUndefined(institution)){
            let userID = await SecuritySystem.Decrypt(query.request, institution);
            if(!BaseSystem.IsNullOrWhiteSpace(userID)){
                let user = await this.Get(User, userID);
                if(!BaseSystem.IsNullOrUndefined(user)){
                    this.response.res.render('Activation', {Name : user.FirstName+' '+user.LastName});
                }else{
                    this.response.res.render('ActivationError', {Error : 'Unable to determine your registration'});
                }
            }else{
                this.response.res.render('ActivationError', {Error : 'Unable to decrypt url'});
            }
        }
        else{
            this.response.res.render('ActivationError', {Error : 'Unable to determine your institution'});
        }
    }
    
}
module.exports = {UserSystem};