/*
public string Alphabet { get; set; }
        public string Medication { get; set; }
        public string Description { get; set; }
        public string error { get; set; }
*/
const {BaseModel} = require('../contracts/BaseModel');
class AlphabetModel extends BaseModel{
    constructor(props){
        super(props);
        this.Alphabet =   props === undefined ? '' : props.Alphabet;
        this.Description =   props === undefined ? '' : props.Description;
    }
}
module.exports = {AlphabetModel};