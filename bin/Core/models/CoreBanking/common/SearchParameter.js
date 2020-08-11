const BaseRequest = require('../../../contracts/BaseRequest');
class SearchParameter extends BaseRequest{
    constructor(props){
        super(props);
        this.Page = props === undefined ? 0 : props.Page;
        this.PageSize = props === undefined ? 0 : props.PageSize;
        this.Sort = props === undefined ? 'ID' : props.Sort;
        this.Direction = props === undefined ? 'asc' : props.Direction;
    }
}
module.exports = {SearchParameter};