const {SearchParameter} = require("../../CoreBanking/common/SearchParameter");

class ViewAllXchangeRequest extends SearchParameter{
    constructor(props){
        super(props);
        this.Name = props === undefined ? '' : props.Name;
    }
}
module.exports = {ViewAllXchangeRequest};