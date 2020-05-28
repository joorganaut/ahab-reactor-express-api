const {BaseModel} = require('./BaseModel')
class BaseResponse extends BaseModel{
    constructor(props){
        super(props)
        this.Message = props.Message;
        this.Code = props.Code;
    }
}
module.exports = BaseResponse;