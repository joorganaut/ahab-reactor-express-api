/*public string InstitutionCode { get; set; }
        public string LoginUsername { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public long InstitutionID { get; set; }
*/
const BaseRequest = require('../../contracts/BaseRequest')
class ChangePinRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.LoginUsername = props === undefined ? '' :  props.LoginUsername;
        this.OldPin = props === undefined ? '' :  props.OldPin;
        this.NewPin = props === undefined ? '' :  props.NewPin;
    }
}
module.exports = {ChangePinRequest};