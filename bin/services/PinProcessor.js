const BaseProcessor = require('./BaseProcessor');
const Responses = require('./common/Responses');
const VTUSource = require('./common/VTUSource');
const {ProcessPinRequest} = require('../Core/models/products/ProcessPinRequest');
const {ProcessPinResponse} = require('../Core/models/products/ProcessPinResponse');
const {ProcessVTURequest} = require('../Core/models/products/ProcessVTURequest');
const {ProcessVTUResponse} = require('../Core/models/products/ProcessVTUResponse');
const {VTUPin} = require('../Core/data/VTUPin');
const {VTUProcessor} = require('./VTUProcessor');
const T = require('../DAO/BusinessObjectDAO');
class PinProcessor extends BaseProcessor{
    constructor(props){
        super(props);
        this.props = props;
    }
    async Execute(param){
        let response = new ProcessPinResponse({Error : ''});
        let request = new ProcessPinRequest(param);
        try
            {
                //validate request
                if (BaseProcessor.IsNullOrWhiteSpace(request.MSISDN))
                {
                    response.ResponseCode = Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                    response.ResponseMessage = Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message + ": Invalid Phone Details "+request.MSISDN;
                    return response;
                } 
                //validate pin
                if (BaseProcessor.IsNullOrWhiteSpace(request.Pin))
                {
                    response.ResponseCode = Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                    response.ResponseMessage = Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Message + " Invalid Pin";
                    return response;
                }

                var query = {Pin : request.Pin, Network : request.Network}
                var vtu2Pin = await T.FindOne(VTUPin, query);
                if(this.IsNullOrUndefined(vtu2Pin)){
                    response.ResponseCode = Responses.MessageResponse_CARD_NUMBER_INVALID_NO_RECORD.Code;
                    response.ResponseMessage = `${Responses.MessageResponse_CARD_NUMBER_INVALID_NO_RECORD.Message}`;
                    return response;
                }
                if (vtu2Pin.IsUsed == true)
                {
                    response.ResponseCode = Responses.MessageResponse_DUPLICATE_TRANSMISSION.Code;
                    response.ResponseMessage = `${Responses.MessageResponse_DUPLICATE_TRANSMISSION.Message}`;
                    return response;
                }
                //call vtu service
                let v_request = new ProcessVTURequest();
                v_request.amount = vtu2Pin.Amount;
                v_request.msisdn = request.MSISDN;
                v_request.network = vtu2Pin.Network;
                v_request.Source = VTUSource.Pin.name;
                let vtuProcessor = new VTUProcessor();
                var v_response = await vtuProcessor.Execute(v_request);
                if (v_response.Code == "00") // successful 
                {
                    vtu2Pin.MSISDN = request.MSISDN;
                    vtu2Pin.IsUsed = true;
                    vtu2Pin.IsSuccessful = true;
                    vtu2Pin.VTUResponse = v_response.message;
                    await T.Update(vtu2Pin);
                    response.ResponseCode = Responses.MessageResponse_SUCCESS.Code;
                    response.ResponseMessage = `${Responses.MessageResponse_SUCCESS.Message}`;
                }
                else
                {
                    response.ResponseCode = v_response.Code;
                    response.ResponseMessage = `${v_response.Message}`;
                }
                //do transaction debit and credit if possible make an async windows service 

            }
            catch (e)
            {
                response.ResponseCode = Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.ResponseMessage = `${Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
            }
        return response; 
    }
}
module.exports = PinProcessor;