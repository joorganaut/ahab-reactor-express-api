class BaseModel{
    constructor(props){
        this.ID = props === undefined ? 0 : props.ID;
        this.Error = props === undefined ? '' : props.Error;
        this.InstitutionID = props === undefined ? 0 : props.InstitutionID;
        this.InstitutionCode = props === undefined ? '' : props.InstitutionCode;
        this.IsEnabled = props === undefined ? false : props.IsEnabled;
        this.DateCreated = props === undefined ? new Date() : props.DateCreated;
        this.DateLastModified = props === undefined ? new Date() : props.DateLastModified;
        this.CreatedBy = props === undefined ? 0 : props.CreatedBy;
        this.LastModifiedBy = props === undefined ? 0 : props.LastModifiedBy;
        this.Name = props === undefined ? 0 : props.Name;
    }
    static ToObject(input){
        return JSON.parse(input);
    }
    ToString(){
        return JSON.stringify(this);
    }
}
module.exports = {BaseModel}