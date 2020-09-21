const BaseResponse = require('../../../contracts/BaseResponse');
const {XchangeModel} = require('../../data/XchangeModel');
class ViewXchangeResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.Model = props === undefined ? new XchangeModel() : props.Model;
     }
}
module.exports = {ViewXchangeResponse};