const BaseRequest = require('../../contracts/BaseRequest');
class FundVTUWalletRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.AccountNumber = props.AccountNumber;
        this.Amount = props.Amount;
        this.VTUUserID = props.VTUUserID;
    }
}
module.exports = {FundVTUWalletRequest}