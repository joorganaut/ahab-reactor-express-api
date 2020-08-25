const BaseResponse = require('../../../contracts/BaseResponse');
class AddXchangeResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.TransactionRef = props === undefined ? '' : props.TransactionRef;
     }
}
module.exports = {AddXchangeResponse};