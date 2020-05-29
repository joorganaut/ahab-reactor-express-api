class BaseModel{
    constructor(props){
        this.Error = props === undefined ? '' : props.Error;
        this.InstitutionID = props === undefined ? 0 : props.InstitutionID;
    }
    static ToObject(input){
        return JSON.parse(input);
    }
    ToString(){
        return JSON.stringify(this);
    }
}
module.exports = {BaseModel}