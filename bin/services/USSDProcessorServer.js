const {
    USSDRequest
} = require('../Core/models/gateways/USSDRequest');
const {
    USSDResponse
} = require('../Core/models/gateways/USSDResponse');
const {
    ProcessPinRequest
} = require('../Core/models/products/ProcessPinRequest');
const Responses = require('./common/Responses');
 const USSDCommand = require('../services/common/USSDCommand');
 const PinProcessor = require('../services/PinProcessor');
class USSDProcessorServer {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    ProcessRequest = async () => {
        let request = new USSDRequest(this.req.body);
        let response = new USSDResponse({Error : ''});
        try {
            if (request.content === null || request.content === undefined || request.content === '' || request.content === "*372*2#") {
                response.content = "Invalid PIN. Please dial *372*2*PIN# to recharge";
                response.msisdn = request.msisdn;
                response.command = USSDCommand.End.name;
                response.src = request.src;
                response.Code = "EP";
                response.Message = "Empty Pin";
            }
            else{
                var responseString = await this.ExecuteUSSDAction(request);
                if (responseString.Code == "00") {
                    response.Content =  "Your airtime recharge was successful, Enjoy unlimited airtime, just dial *372*2#";
                } else if (responseString.Code == "94") {
                    response.Content =  "This recharge pin has been used before, Enjoy unlimited airtime, just dial *372*2#";
                } else if (responseString.Code == "EP") {
                    response.Code = responseString.Message;
                    response.Message = responseString.Code;
                } else {
                    response.Content =  `Your airtime recharge failed ${response.Message}, Enjoy unlimited airtime, just dial *372*2#`;
                }
                response.msisdn = request.msisdn;
                response.command = USSDCommand.End.name;
                response.src = request.src;
                response.Code = responseString.Code;
                response.Message = responseString.Message;
            }
            
        } catch (e) {
            response.Code = response.content = Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.Message}`;
        }
        this.res.send(response.ToString());
    }
    ExecuteUSSDAction = async (request) => {
        let result = new USSDResponse({Error : ''});
        let pin = request.content.split('*');
        if (pin.length < 3) {
            result.content = "Invalid PIN. Please dial *372*2*PIN# to recharge";
            result.Code = "EP";
            result.Message = "Empty Pin";
        } else {
            var processPinRequest = new ProcessPinRequest({
                MSISDN : request.msisdn,
                Pin : pin[3].replace("#", ""),
                Network : request.src
            })
            var p_response = await new PinProcessor().Execute(processPinRequest);
            result.Code = p_response.ResponseCode;
            result.Message = p_response.ResponseMessage;
        }
        return result;
    }
}
module.exports = {
    USSDProcessorServer
}