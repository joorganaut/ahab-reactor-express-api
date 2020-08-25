const BaseRequest = require('../../../contracts/BaseRequest');
const {XchangeModel} = require('../../data/XchangeModel');
class UpdateXchangeRequest extends BaseRequest{
    constructor(props){
        super(props);
        this.Model =   props === undefined ? {} : new XchangeModel(props);
    }
}
module.exports = {UpdateXchangeRequest};