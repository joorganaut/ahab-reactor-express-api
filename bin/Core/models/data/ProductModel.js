const {BaseModel} = require('../../contracts/BaseModel');
class ProductModel extends BaseModel{
    constructor(props){
        super(props);
        this.Name = props === undefined ? '' :  props.Name;
        this.IsGLProduct = props === undefined ? false :  props.IsGLProduct;
        this.MinimumBalance = props === undefined ? 0 :  props.MinimumBalance;
        this.HasOverDraft = props === undefined ? false :  props.HasOverDraft;
        this.OverDraftLimit = props === undefined ? 0 :  props.OverDraftLimit;
        this.OverDraftInterestRate = props === undefined ? 0 :  props.OverDraftInterestRate;
        this.OverDraftTenor = props === undefined ? 0 :  props.OverDraftTenor;
        this.DepositInterestRate = props === undefined ? 0 :  props.DepositInterestRate;
        this.Status = props === undefined ? 0 :  props.Status;
        this.DepositTenor = props === undefined ? 0 :  props.DepositTenor;
        this.InstitutionPercentage = props === undefined ? 0 : props.InstitutionPercentage;
        this.CustomerPercentage = props === undefined ? 0 : props.CustomerPercentage;
        this.IncomeAccount = props === undefined ?  0 : props.IncomeAccount;
        this.ExpenseAccount = props === undefined ? 0 : props.ExpenseAccount;
        this.CurrencyID = props === undefined ? 0 :  props.CurrencyID;
        this.Currency = props === undefined ? '' :  props.Currency;
    }
}
module.exports = {ProductModel};
/*InstitutionPercentage: { type:  DataTypes.DECIMAL},
    CustomerPercentage: { type:  DataTypes.DECIMAL},
    IncomeAccount: { type:  DataTypes.BIGINT},
    ExpenseAccount: { type:  DataTypes.BIGINT},
public string Name { get; set; }
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