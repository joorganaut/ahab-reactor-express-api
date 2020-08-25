const BaseRequest = require("../../../contracts/BaseRequest");


class SearchResult extends BaseRequest{
    constructor(props){
        super(props);
        this.Model = props === undefined ? [] : props.Records;
        this.TotalItemsCount = props === undefined ? 0 : props.TotalItemsCount;
    }
}
module.exports = {SearchResult};