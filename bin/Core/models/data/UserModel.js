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
        this.ID = props.ID;
        this.Username = props.Username;
        this.ProfileImage = props.ProfileImage;
        this.FirstName = props.FirstName;
        this.LastName = props.LastName;
        this.Password = props.Password;
        this.TransactionPin = props.TransactionPin;
        this.ForcePasswordChange = props.ForcePasswordChange;
        this.ForcePinChange = props.ForcePinChange;
        this.DateOfBirth = props.DateOfBirth;
        this.Email = props.Email;
        this.IsAuthenticated = props.IsAuthenticated;
        this.LastLoginDate = props.LastLoginDate;
        this.NumberOfFailedAttempts = props.NumberOfFailedAttempts;
        this.PhoneNumber = props.PhoneNumber;
    }
}
module.exports = {UserModel}