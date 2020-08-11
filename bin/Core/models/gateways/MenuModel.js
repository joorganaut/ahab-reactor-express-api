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
const {BaseModel} = require('../../contracts/BaseModel');
class MenuModel extends BaseModel{
    constructor(props){
        super(props);
        this.Phonenumber = props.Phonenumber;
        this.PageNumber = props === undefined ? '' :  props.PageNumber;
        this.PreviousPageNumber = props === undefined ? null : props.PreviousPageNumber;
        this.NextPageNumber = props === undefined ? null : props.NextPageNumber;
        this.Content = props === undefined ? null : props.Content;
        this.SelectedValue = props === undefined ? null : props.SelectedValue;
        this.ActionOutput = props === undefined ? null : props.ActionOutput;
        this.Action = props === undefined ? ()=>{} : props.Action(this.SelectedValue, this.Phonenumber, x=>{this.ActionOutput = x;});
    }
}
module.exports = {MenuModel};