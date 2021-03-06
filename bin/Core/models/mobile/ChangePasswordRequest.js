/*public string InstitutionCode { get; set; }
        public string LoginUsername { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public long InstitutionID { get; set; }
*/
const BaseRequest = require('../../contracts/BaseRequest')
class ChangePasswordRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.LoginUsername =  props === undefined ? '' : props.LoginUsername;
        this.OldPassword =  props === undefined ? '' : props.OldPassword;
        this.NewPassword =  props === undefined ? '' : props.NewPassword;
    }
}
module.exports = {ChangePasswordRequest}