const BaseRequest = require('../../../contracts/BaseRequest');
const {XchangeModel} = require('../../data/XchangeModel')
class AddXchangeRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Model =   props === undefined ? {} : new XchangeModel(props);
    }
}
module.exports = {AddXchangeRequest};