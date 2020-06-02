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
        CurrencyID: {type: DataTypes.BIGINT},
    Currency: {type: DataTypes.STRING},
*/
const {BaseModel} = require('../../contracts/BaseModel')
class AccountModel extends BaseModel{
    constructor(props){
        super(props);
        this.AccountNumber = props === undefined ? '' :  props.AccountNumber;
        this.ProductID = props === undefined ? 0 :  props.ProductID;
        this.AccountBalance = props === undefined ? 0 :  props.AccountBalance;
        this.CustomerID = props === undefined ? 0 :  props.CustomerID;
        this.IsGL = props === undefined ? false :  props.IsGL;
        this.MinimumBalance = props === undefined ? 0 :  props.MinimumBalance;
        this.HasOverDraft = props === undefined ? false :  props.HasOverDraft;
        this.OverDraftLimit = props === undefined ? 0 :  props.OverDraftLimit;
        this.OverDraftInterestRate = props === undefined ? 0 :  props.OverDraftInterestRate;
        this.OverDraftTenor = props === undefined ? 0 :  props.OverDraftTenor;
        this.DepositInterestRate = props === undefined ? 0 :  props.DepositInterestRate;
        this.Status = props === undefined ? '' :  props.Status;
        this.DepositTenor = props === undefined ? 0 :  props.DepositTenor;
        this.CurrencyID = props === undefined ? 0 : props.CurrencyID;
        this.Currency = props === undefined ? 'NGN' : props.Currency;
    }
}
module.exports = {AccountModel}