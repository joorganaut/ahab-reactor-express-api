const BaseProcessor = require('./BaseProcessor');
const Responses = require('./common/Responses');
const {VTULog} = require('../Core/data/VTULog');
const T = require('../DAO/BusinessObjectDAO');
const {VTURequest} = require('../Core/models/integration/VTURequest');
const {VTUResponse} = require('../Core/models/integration/VTUResponse');
const {ProcessVTURequest} = require('../Core/models/products/ProcessVTURequest');
const {ProcessVTUResponse} = require('../Core/models/products/ProcessVTUResponse');
const {VTUEngine} = require('./common/VTUEngine');
const {HTTPConfig} = require('../Core/processors/HTTPConfig');
const HTTPMethod = require('../Core/enums/HTTPMethod');
class VTUProcessor extends BaseProcessor{
    constructor(props){
        super(props)

    }
    ExecuteVTUAction=async(input)=>{
        let response = new VTUResponse();
        let vtuPrefix = new VTUEngine.vtuPrefix;
        let vtuUrl = VTUEngine.vtuUrl;
        let username = VTUEngine.username;
        let password = VTUEngine.password;
        let postingConfig = new HTTPConfig();
        postingConfig.IP = vtuPrefix;
        postingConfig.Route = vtuUrl;
        postingConfig.Method = HTTPMethod.POST.name;
        postingConfig.DataType = "application/x-www-form-urlencoded";
        request.password = password;
        request.email = username;//.Replace("@", "%40");
        request.network = request.network.toUpperCase();
        let error = '';
        response = await BaseProcessor.ExecuteGetWithUrl(postingConfig, request, error);            
        return response;
    }
    Execute=async(input)=>{
        let response = new ProcessVTUResponse({Error : ''});
        let request = new ProcessVTURequest(input);
        try
            {
                let vtuLog = new VTULog()
                {
                    Amount = request.amount,
                    Institution = Institution,
                    DateCreated = DateTime.Now,
                    DateLastModified = DateTime.Now,
                    MSISDN = request.msisdn,
                    Network = request.network,
                    RequestID = BaseProcessor.GetDateAndTime(false),
                    Source = request.Source
                };
                let v_request = new VTURequest(request);
                v_request.requestId = vtuLog.RequestID;
                await T.Save(VTULog, vtuLog)
                var v_response = await this.ExecuteVTUAction(v_request);
                response.status = vtuLog.StatusMessage = v_response.message;
                response.statuscode = vtuLog.ResponseCode = v_response.statuscode;
                response.status = vtuLog.Status = v_response.status;
                response.requestId = v_response.requestId;
                vtuLog.IsSuccessful = v_response.statuscode == 0 ? true : false;
                vtuLog.ResponseMessage = v_response.message;
                await T.Update(vtuLog)
                response.Code = vtuLog.IsSuccessful? MessageResponses.SUCCESS.Code:MessageResponses.AUTHENTICATION_ERROR.Code;
                response.Message = vtuLog.IsSuccessful ? `${MessageResponses.SUCCESS.Message} : ${vtuLog.ResponseMessage}` : `${MessageResponses.AUTHENTICATION_ERROR.Message} : ${vtuLog.ResponseMessage}`;
            }
            catch (e)
            {
                response.Code = MessageResponses.SYSTEM_MALFUNCTION.Code;
                response.Message = `${Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: {e.Message}`;
            }
            return response;
    }
}
module.exports = {VTUProcessor}
