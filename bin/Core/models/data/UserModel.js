/*public long ID { get; set; }
        public string Username { get; set; }
        public string ProfileImage { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string TransactionPin { get; set; }
        public bool ForcePasswordChange { get; set; }
        public bool ForcePinChange { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public bool IsAuthenticated { get; set; }
        [JsonIgnore]
        public DateTime LastLoginDate { get; set; }
        [JsonIgnore]
        public int NumberOfFailedAttempts { get; set; }
        public string PhoneNumber { get; set; }
*/
const {BaseModel} = require('../../contracts/BaseModel')
class UserModel extends BaseModel{
    constructor(props){
        super(props);
        this.ID =  props === undefined ? 0 : props.ID;
        this.Username =  props === undefined ? '' : props.Username;
        this.ProfileImage =  props === undefined ? '' : props.ProfileImage;
        this.FirstName =  props === undefined ? '' : props.FirstName;
        this.LastName =  props === undefined ? '' : props.LastName;
        this.Password =  props === undefined ? '' : props.Password;
        this.TransactionPin = props === undefined ? '' :  props.TransactionPin;
        this.ForcePasswordChange = props === undefined ? false :  props.ForcePasswordChange;
        this.ForcePinChange = props === undefined ? false :  props.ForcePinChange;
        this.DateOfBirth = props === undefined ? '' :  props.DateOfBirth;
        this.Email = props === undefined ? '' :  props.Email;
        this.IsAuthenticated = props === undefined ? false :  props.IsAuthenticated;
        this.LastLoginDate = props === undefined ? '' :  props.LastLoginDate;
        this.NumberOfFailedAttempts = props === undefined ? 0 :  props.NumberOfFailedAttempts;
        this.PhoneNumber = props === undefined ? '' :  props.PhoneNumber;
    }
}
module.exports = {UserModel}