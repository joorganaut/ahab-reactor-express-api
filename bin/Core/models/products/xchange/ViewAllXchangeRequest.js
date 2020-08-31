const {SearchParameter} = require("../../CoreBanking/common/SearchParameter");

class ViewAllXchangeRequest extends SearchParameter{
    constructor(props){
        super(props);
        this.Amount = props === undefined ? 0 : props.Amount;
        this.RequesterID = props === undefined ? 0 : props.RequesterID;
    }
}
module.exports = {ViewAllXchangeRequest};