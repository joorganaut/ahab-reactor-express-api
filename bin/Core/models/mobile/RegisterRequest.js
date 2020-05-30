const BaseRequest = require('../../contracts/BaseRequest');
const {InstitutionModel} = require('../data/InstitutionModel');
const {UserModel} = require('../data/UserModel');
const {CustomerModel} = require('../data/CustomerModel');
class RegisterRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.InstitutionModel =  props === undefined ? new InstitutionModel() :  props.InstitutionModel;
        this.UserModel =  props === undefined ? new UserModel() :  props.UserModel;
        this.CustomerModel =  props === undefined ? new CustomerModel() :  props.CustomerModel;
    }
}
module.exports = {RegisterRequest};