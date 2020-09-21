const BaseResponse = require('../../contracts/BaseResponse');
const UserModel = require('../data/UserModel');
class GetUserResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.Model = props === undefined ? new UserModel() : props.Model;
     }
}
module.exports = {GetUserResponse};