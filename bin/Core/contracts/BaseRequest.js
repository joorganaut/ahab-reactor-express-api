const {BaseModel} = require('./BaseModel')
class BaseRequest extends BaseModel{
    constructor(props){
        super(props)
        this.InstitutionID = props.InstitutionID;
        this.InstitutionCode = props.InstitutionCode;
        this.Username = props.Username;
        this.UserID = props.UserID;
        this.IP = props.IP;
        this.MAC = props.MAC;
        this.Error = props.Error;
        /*
        public string Username { get; set ; }
        public long UserID { get; set ; }
        public string IP { get; set ; }
        public string MAC { get; set ; }
        public string Error { get; set; }
        public long InstitutionID { get; set; }
        */
    }
}
module.exports = BaseRequest;