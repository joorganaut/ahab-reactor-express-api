class BaseModel{
    constructor(props){
        this.Error = props.Error;
        this.InstitutionID = props.InstitutionID
    }
    static ToObject(input){
        return JSON.parse(input);
    }
    ToString(){
        return JSON.stringify(this);
    }
}
module.exports = {BaseModel}