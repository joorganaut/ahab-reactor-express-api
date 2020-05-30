const BaseResponse = require('../../contracts/BaseResponse');
const {InstitutionModel} = require('../data/InstitutionModel');
const {AccountModel} = require('../data/AccountModel');
const {UserModel} = require('../data/UserModel');
const {CustomerModel} = require('../data/CustomerModel');
class LoginResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.IsAuthenticated = props === undefined ? false :  props.IsAuthenticated;
        this.InstitutionModel = props === undefined ? new InstitutionModel() :  props.InstitutionModel;
        this.AccountModels =  props === undefined ? [new AccountModel()] :  props.AccountModels;
        this.UserServiceModel =  props === undefined ? new UserModel() :  props.UserServiceModel;
        this.CustomerModel =  props === undefined ? new CustomerModel() : props.CustomerModel;
    }
}
module.exports = {LoginResponse};