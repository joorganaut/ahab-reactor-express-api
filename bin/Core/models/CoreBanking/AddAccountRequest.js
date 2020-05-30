const BaseRequest = require('../../contracts/BaseRequest');
class AddAccountRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Name = props === undefined ? '' :  props.Name;
        this.AccountNumber = props === undefined ? '' :  props.AccountNumber;
        this.ProductID = props === undefined ? 0 :  props.ProductID;
        this.CustomerID = props === undefined ? 0 :  props.CustomerID;
        this.IsGL = props === undefined ? false :  props.IsGL;
        this.MinimumBalance = props === undefined ? 0 :  props.MinimumBalance;
        this.HasOverDraft = props === undefined ? false :  props.HasOverDraft;
        this.OverDraftLimit = props === undefined ? 0 :  props.OverDraftLimit;
        this.OverDraftInterestRate = props === undefined ? 0 :  props.OverDraftInterestRate;
        this.OverDraftTenor = props === undefined ? 0 :  props.OverDraftTenor;
        this.DepositInterestRate = props === undefined ? 0 :  props.DepositInterestRate;
        this.Status = props === undefined ? 0 :  props.Status;
        this.DepositTenor = props === undefined ? 0 :  props.DepositTenor;
    }
}
module.exports = {AddAccountRequest};
/*public string Name { get; set; }
        public  string AccountNumber { get; set; }
        public  long ProductID { get; set; }
        public  long CustomerID { get; set; }
        public  bool IsGL { get; set; }
        public  decimal MinimumBalance { get; set; }
        public  bool HasOverDraft { get; set; }
        public  decimal OverDraftLimit { get; set; }
        public  decimal OverDraftInterestRate { get; set; }
        public  int OverDraftTenor { get; set; }
        public  decimal DepositInterestRate { get; set; }
        public AccountStatus Status { get; set; }
        public  int DepositTenor { get; set; }
*/