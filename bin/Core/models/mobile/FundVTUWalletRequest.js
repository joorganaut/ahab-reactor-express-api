const BaseRequest = require('../../contracts/BaseRequest');
class FundVTUWalletRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.AccountNumber = props === undefined ? '' :  props.AccountNumber;
        this.Amount =  props === undefined ? 0 : props.Amount;
        this.VTUUserID =  props === undefined ? 0 : props.VTUUserID;
    }
}
module.exports = {FundVTUWalletRequest}