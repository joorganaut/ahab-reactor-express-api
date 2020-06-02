const BaseResponse = require('../../contracts/BaseResponse');
class SinglePostResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.Account = props === undefined ? '' :  props.Account;
        this.AccountBalance = props === undefined ? 0 :  props.AccountBalance;
        this.TransactionRef = props === undefined ? 0 :  props.TransactionRef;
    }
}
module.exports = {SinglePostResponse};
/*public string Account { get; set; }
        public decimal AccountBalance { get; set; }
        public string TransactionRef { get; set; }
*/