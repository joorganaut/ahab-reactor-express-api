const BaseResponse = require("../../../contracts/BaseResponse");


class SearchResult extends BaseResponse{
    constructor(props){
        super(props);
        this.Model = props === undefined ? [] : props.Records;
        this.count = props === undefined ? 0 : props.count;
    }
}
module.exports = {SearchResult};