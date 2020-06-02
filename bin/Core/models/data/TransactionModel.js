/*public virtual string Account { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual string Narration { get; set; }
        public virtual string TransactionRef { get; set; }
        public virtual string TraceID { get; set; }
        public virtual string Source { get; set; }
        public virtual string GuidRef { get; set; }
        public virtual TransactionType Type { get; set; }
*/
const {BaseModel} = require('../../contracts/BaseModel');
class TransactionModel extends BaseModel{
    constructor(props){
        super(props);
        this.Account = props === undefined ? '' :  props.Account;
        this.Amount = props === undefined ? 0 :  props.Amount;
        this.Narration = props === undefined ? '' :  props.Narration;
        this.TransactionRef = props === undefined ? '' :  props.TransactionRef;
        this.TraceID = props === undefined ? '' :  props.TraceID;
        this.Source = props === undefined ? 0 :  props.Source;
        this.GuidRef = props === undefined ? '' :  props.GuidRef;
        this.Type = props === undefined ? 0 :  props.Type;
    }
}
module.exports = {TransactionModel}