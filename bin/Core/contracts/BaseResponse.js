const {BaseModel} = require('./BaseModel')
class BaseResponse extends BaseModel{
    constructor(props){
        super(props);
        this.Message = props === undefined ? '' : props.Message;
        this.Code = props === undefined ? '' : props.Code;
    }
}
module.exports = BaseResponse;