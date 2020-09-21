const BaseRequest = require('../../../contracts/BaseRequest');
const {XchangeModel} = require('../../data/XchangeModel');
class ViewXchangeRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.ID =   props === undefined ? 0 : props.ID;
    }
}
module.exports = {ViewXchangeRequest};