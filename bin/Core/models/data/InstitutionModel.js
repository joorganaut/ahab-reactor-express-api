/*public  string Code { get; set; }
        public  string ContactEmail { get; set; }
        public  string ContactPhonenumber { get; set; }
        public  string ContactAddress { get; set; }
        [JsonIgnore]
        public  string DecryptionKey { get; set; }
        [JsonIgnore]
        public  string PassPhrase { get; set; }
        public  string Password { get; set; }
        [JsonIgnore]
        public  string EncryptionKey { get; set; }
        [JsonIgnore]
        public  string LocalConnectionString { get; set; }
        [JsonIgnore]
        public  string RemoteConnectionString { get; set; }
        public  string Industry { get; set; }
        public  string ShortName { get; set; }
        [JsonIgnore]
        public  string ApprovedIP { get; set; }
        public string Error { get; set; }
        public string Name { get; set; }
*/
const {BaseModel} = require('../../contracts/BaseModel')
class InstitutionModel extends BaseModel{
    constructor(props){
        super(props);
        this.ContactEmail = props.ContactEmail;
        this.ContactPhonenumber = props.ContactPhonenumber;
        this.ContactAddress = props.ContactAddress;
        this.DecryptionKey = props.DecryptionKey;
        this.PassPhrase = props.PassPhrase;
        this.Password = props.Password;
        this.EncryptionKey = props.EncryptionKey;
        this.LocalConnectionString = props.LocalConnectionString;
        this.RemoteConnectionString = props.RemoteConnectionString;
        this.Industry = props.Industry;
        this.ShortName = props.ShortName;
        this.Name = props.Name;
    }
}
module.exports = {InstitutionModel}