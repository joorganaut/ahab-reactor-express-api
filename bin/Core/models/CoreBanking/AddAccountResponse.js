const BaseResponse = require('../../contracts/BaseResponse');
class AddAccountResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.AccountNumber = props === undefined ? '' :  props.AccountNumber;
    }
}
module.exports = {AddAccountResponse};