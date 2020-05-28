/*public string InstitutionCode { get; set; }
        public string LoginUsername { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public long InstitutionID { get; set; }
*/
const BaseRequest = require('../../contracts/BaseRequest')
class ChangePasswordRequest extends BaseRequest{
    constructor(props){
        super(props)
        this.LoginUsername = props.LoginUsername;
        this.OldPassword = props.OldPassword;
        this.NewPassword = props.NewPassword;
    }
}
module.exports = {ChangePasswordRequest}