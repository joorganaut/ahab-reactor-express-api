var express = require('express');
var router = express.Router();
var {AuthenticationSystem} = require('../bin/services/AuthenticationSystem');
var {InstitutionSystem} = require('../bin/services/InstitutionSystem');
var {UserSystem} = require('../bin/services/UserSystem');
var {VTUSystem} = require('../bin/services/VTUSystem');

/**
 * @swagger
 * responses:
 *   ValidateInstitutionResponse:
 *     properties:
 *       ResponseCode:
 *         type: string
 *       ResponseMessage:
 *         type: string
 *       Error:
 *         type: string 
 */

/**
 * @swagger
 * definitions:
 *   ValidateInstitutionRequest:
 *     properties:
 *       InstitutionCode:
 *         type: string
 *       InstitutionPassword:
 *         type: string
 *   ValidateInstitutionResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   LoginRequest:
 *     properties:
 *       LoginUsername:
 *         type: string
 *       Password:
 *         type: string
 *   LoginResponse:
 *     properties:
 *       IsAuthenticated:
 *         type: boolean
 *       InstitutionModel:
 *         $ref: '#/definitions/InstitutionModel'
 *       UserModel:
 *         $ref: '#/definitions/UserModel'
 *       CustomerModel:
 *         $ref: '#/definitions/CustomerModel'
 *       AccountModels:
 *         type: array
 *         items: 
 *           $ref: '#/definitions/AccountModel'
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   InstitutionModel:
 *     properties:
 *       ContactEmail:
 *         type: string
 *       ContactPhonenumber:
 *         type: string
 *       ContactAddress:
 *         type: string 
 *       DecryptionKey:
 *         type: string
 *       PassPhrase:
 *         type: string
 *       Password:
 *         type: string 
 *       EncryptionKey:
 *         type: string
 *       LocalConnectionString:
 *         type: string
 *       RemoteConnectionString:
 *         type: string 
 *       Industry:
 *         type: string
 *       ShortName:
 *         type: string
 *       Name:
 *         type: string 
 *   UserModel:
 *     properties:
 *       ID:
 *         type: number
 *       Username:
 *         type: string
 *       ProfileImage:
 *         type: string 
 *       FirstName:
 *         type: string
 *       LastName:
 *         type: string
 *       Password:
 *         type: string 
 *       TransactionPin:
 *         type: number
 *       ForcePasswordChange:
 *         type: boolean
 *       ForcePinChange:
 *         type: boolean 
 *       DateOfBirth:
 *         type: date
 *       Email:
 *         type: string
 *       IsAuthenticated:
 *         type: boolean 
 *       LastLoginDate:
 *         type: date
 *       NumberOfFailedAttempts:
 *         type: number
 *       PhoneNumber:
 *         type: string 
 *   CustomerModel:
 *     properties:
 *       FirstName:
 *         type: string
 *       LastName:
 *         type: string
 *       OtherName:
 *         type: string 
 *       PhoneNumber:
 *         type: string
 *       Email:
 *         type: string
 *       Gender:
 *         type: number 
 *       DateOfBirth:
 *         type: date
 *       BVN:
 *         type: string
 *       Address:
 *         $ref: '#/definitions/AddressModel'
 *   AccountModel:
 *     properties:
 *       AccountNumber:
 *         type: string
 *       ProductID:
 *         type: number
 *       AccountBalance:
 *         type: number 
 *       CustomerID:
 *         type: number
 *       IsGL:
 *         type: boolean
 *       MinimumBalance:
 *         type: number 
 *       HasOverDraft:
 *         type: boolean
 *       OverDraftLimit:
 *         type: number
 *       OverDraftInterestRate:
 *         type: number 
 *       OverDraftTenor:
 *         type: number
 *       DepositInterestRate:
 *         type: number
 *       Status:
 *         type: number 
 *       DepositTenor:
 *         type: number 
 *   AddressModel:
 *     properties:
 *       Street:
 *         type: string
 *       City:
 *         type: string
 *       State:
 *         type: string 
 *       Country:
 *         type: string 
 *   TopUpMSISDNRequest:
 *     properties:
 *       amount:
 *         type: number
 *       msisdn:
 *         type: string
 *       network:
 *         type: string
 *   TopUpMSISDNResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   ValidateUserPinRequest:
 *     properties:
 *       Pin:
 *         type: number
 *   ValidateUserPinResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   FundVTUWalletRequest:
 *     properties:
 *       AccountNumber:
 *         type: string
 *       Amount:
 *         type: number
 *       VTUUserID:
 *         type: number
 *   FundVTUWalletResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   ChangePasswordRequest: 
 *     properties:
 *       LoginUsername:
 *         type: string
 *       OldPassword:
 *         type: string
 *       NewPassword:
 *         type: string
 *   ChangePasswordResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   ResetPasswordRequest:
 *     properties:
 *       LoginUsername:
 *         type: string
 *   ResetPasswordResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       Error:
 *         type: string 
 *   RegisterRequest:
 *     properties:
 *       InstitutionModel:
 *          $ref: '#/definitions/InstitutionModel'
 *       UserModel:
 *          $ref: '#/definitions/UserModel'
 *       CustomerModel:
 *          $ref: '#/definitions/CustomerModel'
 *   RegisterResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       InstitutionCode:
 *         type: string
 *       Error:
 *         type: string 
 *   IndividualRegisterRequest:
 *     properties:
 *       InstitutionCode:
 *         type: string
 *       InstitutionPassword:
 *         type: string
 *       UserModel:
 *          $ref: '#/definitions/UserModel'
 *       CustomerModel:
 *          $ref: '#/definitions/CustomerModel'
 *   IndividualRegisterResponse:
 *     properties:
 *       Code:
 *         type: string
 *       Message:
 *         type: string
 *       InstitutionCode:
 *         type: string
 *       Error:
 *         type: string 
 */

/**
 * @swagger
 * /api/MobileMiddleware/Authentication/ValidateInstitution:
 *   post:
 *     tags:
 *       - Authenticate, Institution
 *     description: Authenticates an institution
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ValidateInstitutionRequest
 *         description: Validate Institution Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ValidateInstitutionRequest'
 *     responses:
 *       200:
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/ValidateInstitutionResponse'
 */
router.post('/MobileMiddleware/Authentication/ValidateInstitution', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new InstitutionSystem(response).AuthenticateInstitution();
    });
});


/**
 * @swagger
 * /api/MobileMiddleware/Authentication/Login:
 *   post:
 *     tags:
 *       - Authenticate, User
 *     description: Authenticates a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: LoginRequest
 *         description: Validate User Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LoginRequest'
 *     responses:
 *       200:
 *         name: LoginResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/LoginResponse'
 */
/* POST retrieve all institution. */
router.post('/MobileMiddleware/Authentication/Login', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new UserSystem(response).Login();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/Authentication/ChangePassword:
 *   post:
 *     tags:
 *       - Password Change, User
 *     description: User changes password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ChangePasswordRequest
 *         description: Change password Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChangePasswordRequest'
 *     responses:
 *       200:
 *         name: ChangePasswordResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/ChangePasswordResponse'
 */
/* POST retrieve all institution. */
router.post('/MobileMiddleware/Authentication/ChangePassword', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new UserSystem(response).ChangePassword();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/Authentication/ResetPassword:
 *   post:
 *     tags:
 *       - Password Reset, User
 *     description: User resets password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ResetPasswordRequest
 *         description: Reset password Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ResetPasswordRequest'
 *     responses:
 *       200:
 *         name: ResetPasswordResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/ResetPasswordResponse'
 */
/* POST retrieve all institution. */
router.post('/MobileMiddleware/Authentication/ResetPassword', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new UserSystem(response).ResetPassword();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/Registration/Register:
 *   post:
 *     tags:
 *       - Register, Institution
 *     description: Registers new Institution
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: RegisterRequest
 *         description: Register Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RegisterRequest'
 *     responses:
 *       200:
 *         name: RegisterResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/RegisterResponse'
 */
/* POST retrieve all institution. */
router.post('/MobileMiddleware/Registration/Register', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new InstitutionSystem(response).RegisterInstitution();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/Registration/RegisterIndividual:
 *   post:
 *     tags:
 *       - Register, User
 *     description: Registers new Individual
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: IndividualRegisterRequest
 *         description: Register Individual Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/IndividualRegisterRequest'
 *     responses:
 *       200:
 *         name: IndividualRegisterResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/IndividualRegisterResponse'
 */
router.post('/MobileMiddleware/Registration/RegisterIndividual', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new UserSystem(response).RegisterIndividual();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/Registration/ActivateAccount:
 *   get:
 *     tags:
 *       - Activate, User Account
 *     description: Activates User Account
 *     produces:
 *       - application/text
 *     parameters:
 *       - name: request
 *         description: Request cipher
 *         in: path
 *         required: true
 *         type:
 *           string
 *       - name: id
 *         description: Request id
 *         in: path
 *         required: true
 *         type:
 *           number
 *     responses:
 *       200:
 *         name: Activation Page
 *         description: redirects to a success page
 *         type: 
 *           page
 */
router.get('/MobileMiddleware/Registration/ActivateAccount', async function(req, res, next) {
    new AuthenticationSystem(req, res, next, ["*"], async (response)=>{
        await new UserSystem(response).ActivateAccount();
    });
});


/**
 * @swagger
 * /api/MobileMiddleware/VTUService/TopUpMSISDN:
 *   post:
 *     tags:
 *       - Top-Up, MSISDN
 *     description: Tops up a mobile number
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: TopUpMSISDNRequest
 *         description: Top-up MSISDN Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TopUpMSISDNRequest'
 *     responses:
 *       200:
 *         name: TopUpMSISDNResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/TopUpMSISDNResponse'
 */
router.post('/MobileMiddleware/VTUService/TopUpMSISDN', async function(req, res, next){
    new AuthenticationSystem(req, res, next, ["admin", "posting", "topup"], async (response)=>{
        await new VTUSystem(response).TopUpMSISDN();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/VTUService/ValidateTransactionPin:
 *   post:
 *     tags:
 *       - Validate, User Pin
 *     description: Validates User Transaction Pin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ValidateUserPinRequest
 *         description: Validate User Pin Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ValidateUserPinRequest'
 *     responses:
 *       200:
 *         name: ValidateUserPinResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/ValidateUserPinResponse'
 */
router.post('/MobileMiddleware/VTUService/ValidateTransactionPin', async function(req, res, next){
    new AuthenticationSystem(req, res, next, ["admin", "posting", "system"], async (response)=>{
        await new VTUSystem(response).TopUpMSISDN();
    });
});

/**
 * @swagger
 * /api/MobileMiddleware/VTUWalletFunding/FundVTUWallet:
 *   post:
 *     tags:
 *       - Fund, User VTU Wallet
 *     description: Funds Users VTU Wallet
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: FundVTUWalletRequest
 *         description: Fund VTU Wallet Request Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/FundVTUWalletRequest'
 *     responses:
 *       200:
 *         name: FundVTUWalletResponse
 *         description: returns a response object signifying success or failure with reason
 *         schema: 
 *           $ref: '#/definitions/FundVTUWalletResponse'
 */
router.post('/MobileMiddleware/VTUWalletFunding/FundVTUWallet', async function(req, res, next){
    new AuthenticationSystem(req, res, next, ["admin", "posting", "system"], async (response)=>{
        await new VTUSystem(response).TopUpMSISDN();
    });
});
module.exports = router;
