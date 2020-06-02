const BaseRequest = require('../../contracts/BaseRequest');
class SinglePostRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.DebitAccount = props === undefined ? '' :  props.DebitAccount;
        this.CreditAccount = props === undefined ? '' :  props.CreditAccount;
        this.Amount = props === undefined ? 0 :  props.Amount;
        this.TransactionRef = props === undefined ? '' :  props.TransactionRef;
        this.Source = props === undefined ? '' :  props.Source;
        this.Narration = props === undefined ? '' :  props.Narration;
    }
}
/*public string DebitAccount { get; set; }
        public string CreditAccount { get; set; }
        public decimal Amount { get; set; }
        public string TransactionRef { get; set; }
        public string Source { get; set; }
        public string Narration { get; set; }
*/
module.exports = {SinglePostRequest};