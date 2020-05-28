class BaseModel{
    constructor(props){
        this.Error = '';
        this.InstitutionID = 0;
    }
    static ToObject(input){
        return JSON.parse(input);
    }
    ToString(){
        return JSON.stringify(this);
    }
}
module.exports = {BaseModel}