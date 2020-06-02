/*/*MSISDN: { type:  DataTypes.STRING},
    Network: { type:  DataTypes.STRING},
    Amount: { type:  DataTypes.DECIMAL},
    Status: { type:  DataTypes.STRING},
    RequestID: { type:  DataTypes.STRING},
    Ref: {type: DataTypes.STRING},
    IsSuccessful: {type: DataTypes.BOOLEAN},
    StatusMessage: { type:  DataTypes.STRING},
    ResponseMessage: { type:  DataTypes.STRING},
    ResponseCode: { type:  DataTypes.INTEGER},
    Source: { type:  DataTypes.INTEGER},
*/
const {BaseModel} = require('../../contracts/BaseModel');
class VTULogModel extends BaseModel{
    constructor(props){
        super(props);
        this.MSISDN = props === undefined ? '' :  props.MSISDN;
        this.Network = props === undefined ? '' :  props.Network;
        this.Amount = props === undefined ? 0 :  props.Amount;
        this.Status = props === undefined ? '' :  props.Status;
        this.RequestID = props === undefined ? 0 :  props.RequestID;
        this.Ref = props === undefined ? '' :  props.Ref;
        this.IsSuccessful = props === undefined ? false :  props.IsSuccessful;
        this.StatusMessage = props === undefined ? 0 :  props.StatusMessage;
        this.ResponseMessage = props === undefined ? '' :  props.ResponseMessage;
        this.ResponseCode = props === undefined ? 0 :  props.ResponseCode;
        this.Source = props === undefined ? 0 :  props.Source;
    }
    static Base64Encode(cipher){
        let result = '';
        result = Buffer.from(cipher).toString('base64');
        return result;
    }
    static Base64Decode(cipher){
        let result = '';
        result = Buffer.from(cipher, 'base64').toString('ascii');
        return result;
    }
}
module.exports = {VTULogModel};