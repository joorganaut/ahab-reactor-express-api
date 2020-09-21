const BaseRequest = require('../../contracts/BaseRequest');
const {UserModel} = require('../data/UserModel');
class GetUserRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Model =   props === undefined ? {} : new UserModel(props);
    }
}
module.exports = {GetUserRequest};