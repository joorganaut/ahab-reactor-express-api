/*
public string[] Request { get; set; }
        public string[] Response { get; set; }
        public int Size { get; set; }
        public Challenge(int size)
        {
            Size = size;
            Request = new string[size];
            Response = new string[size];
        }
*/
const {BaseModel} = require('../contracts/BaseModel');
class Challenge extends BaseModel{
    constructor(props){
        super(props);
        this.Request = props !== undefined? props.Request : [];
        this.Response = props !== undefined?  props.Response : [];
        this.Size = props !== undefined?  props.Size : 0;
    }
}
module.exports = {Challenge};