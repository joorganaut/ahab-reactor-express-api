/*
public  string AccountNumber { get; set; }
        public  decimal AccountBalance { get; set; }
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
const {BaseModel} = require('../../contracts/BaseModel')
class AccountModel extends BaseModel{
    constructor(props){
        super(props)
        this.AccountNumber = props.AccountNumber;
        this.ProductID = props.ProductID;
        this.AccountBalance = props.AccountBalance;
        this.CustomerID = props.CustomerID;
        this.IsGL = props.IsGL;
        this.MinimumBalance = props.MinimumBalance;
        this.HasOverDraft = props.HasOverDraft;
        this.OverDraftLimit = props.OverDraftLimit;
        this.OverDraftInterestRate = props.OverDraftInterestRate;
        this.OverDraftTenor = props.OverDraftTenor;
        this.DepositInterestRate = props.DepositInterestRate;
        this.Status = props.Status;
        this.DepositTenor = props.DepositTenor;
    }
}
module.exports = {AccountModel}