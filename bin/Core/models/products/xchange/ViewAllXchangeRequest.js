const {SearchParameter} = require("../../CoreBanking/common/SearchParameter");

class ViewAllXchangeRequest extends SearchParameter{
    constructor(props){
        super(props);
        this.Amount = props === undefined ? '' : props.Amount;
    }
}
module.exports = {ViewAllXchangeRequest};