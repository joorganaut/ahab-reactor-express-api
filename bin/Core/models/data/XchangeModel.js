/*
   FirstName?: string;
    LastName?: string;
    Amount?: number;
    Rate?: number;
    FromCurrency?: string;
    ToCurrency?: string;
    Status?: 'pending' | 'in-progress' | 'completed' | 'cancelled'
*/
const {BaseModel} = require('../../contracts/BaseModel');
class XchangeModel extends BaseModel{
    constructor(props){
        super(props);
        console.log(JSON.stringify(props));
        this.RequesterUserID = props === undefined ? 0 :  props.RequesterUserID;
        this.Amount = props === undefined ? 0 :  props.Amount;
        this.Rate = props === undefined ? 0 : props.Rate;
        this.FirstName = props === undefined ? '' :  props.FirstName;
        this.LastName = props === undefined ? '' :  props.LastName;
        this.PhoneNumber = props === undefined ? '' :  props.PhoneNumber;
        this.Email = props === undefined ? '' :  props.Email;
        this.FromCurrency = props === undefined ? '' :  props.FromCurrency;
        this.ToCurrency = props === undefined ? '' :  props.ToCurrency;
        this.Status = props === undefined ? '' :  props.Status;
        this.ExpiryDate = props === undefined ? new Date() : props.ExpiryDate;
        this.TransactionRef = props === undefined ? '' : props.TransactionRef;
    }
} 
module.exports = {XchangeModel};