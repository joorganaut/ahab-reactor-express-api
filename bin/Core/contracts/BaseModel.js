class BaseModel{
    constructor(props){
        this.Error = props === undefined ? '' : props.Error;
        this.InstitutionID = props === undefined ? 0 : props.InstitutionID;
        this.IsEnabled = props === undefined ? 0 : props.IsEnabled;
        this.DateCreated = props === undefined ? 0 : props.DateCreated;
        this.DateLastModified = props === undefined ? 0 : props.DateLastModified;
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