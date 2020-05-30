const {BaseModel} = require('./BaseModel')
class BaseRequest extends BaseModel{
    constructor(props){
        super(props);
        this.InstitutionID = props === undefined ? '' :  props.InstitutionID;
        this.InstitutionCode = props === undefined ? '' :  props.InstitutionCode;
        this.Username = props === undefined ? '' :  props.Username;
        this.UserID = props === undefined ? '' :  props.UserID;
        this.IP = props === undefined ? '' :  props.IP;
        this.MAC = props === undefined ? '' :  props.MAC;
        this.Error = props === undefined ? '' :  props.Error;
        this.DateCreated = props === undefined ? '' :  props.DateCreated;
        this.DateLastModified = props === undefined ? '' :  props.DateLastModified;
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