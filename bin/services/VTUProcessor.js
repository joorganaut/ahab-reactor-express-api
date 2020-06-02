const BaseSystem = require('./BaseSystem');
const Responses = require('./common/Responses');
const {VTULog} = require('../Core/data/VTULog');
const {VTULogModel} = require('../Core/models/data/VTULogModel');
const T = require('../DAO/BusinessObjectDAO');
const {VTURequest} = require('../Core/models/integration/VTURequest');
const {VTUResponse} = require('../Core/models/integration/VTUResponse');
const {ProcessVTURequest} = require('../Core/models/products/ProcessVTURequest');
const {ProcessVTUResponse} = require('../Core/models/products/ProcessVTUResponse');
const {VTUPrefix, VTUUrl, RequeryUrl, Username, Password} = require('./common/VTUEngine');
const {HTTPConfig} = require('../Core/processors/HTTPConfig');
const HTTPMethod = require('../Core/enums/HTTPMethod');
class VTUProcessor extends BaseSystem{
    constructor(response, props){
        super(props);
        this.response = response;
    }
    static async ExecuteVTUAction(request){
        let response = new VTUResponse();
        let vtuPrefix = VTUPrefix;
        let vtuUrl = VTUUrl;
        let username = Username;
        let password = Password;
        let postingConfig = new HTTPConfig();
        postingConfig.IP = vtuPrefix;
        postingConfig.Route = vtuUrl;
        postingConfig.Url = postingConfig.IP + postingConfig.Route;
        postingConfig.Method = HTTPMethod.POST.name;
        postingConfig.DataType = "application/x-www-form-urlencoded";
        request.password = password;
        request.email = username;//.Replace("@", "%40");
        request.network = request.network.toUpperCase();
        let error = '';
        response = await BaseSystem.ExecuteGetWithUrl(postingConfig, request, error);            
        return response;
    }
    static async Execute(input){
        let response = new ProcessVTUResponse({Error : ''});
        let request = new ProcessVTURequest(input);
        try
            {
                let vtuLog = new VTULogModel();
                vtuLog.Amount = request.amount;
                vtuLog.InstitutionID = request.InstitutionID;
                vtuLog.DateCreated = BaseSystem.GetDateAndTime(true);
                vtuLog.DateLastModified = BaseSystem.GetDateAndTime(true);
                vtuLog.MSISDN = request.msisdn;
                vtuLog.Network = request.network;
                vtuLog.RequestID = BaseSystem.GetDateAndTime(false);
                vtuLog.Source = request.source;
                let v_request = new VTURequest(request);
                v_request.requestId = vtuLog.RequestID;
                await T.Save(VTULog, vtuLog).then(res=>{vtuLog = res;});
                let d_response = await this.ExecuteVTUAction(v_request);
                /*config:Object {url: "http://54.36.101.235/api/bvn/airtime_vend.php", method: "get", params: VTURequest, …}
                    data:Object {status: "failed", message: "Amount cannot be less than 50", errorcode: -4}
                    headers:Object {date: "Mon, 01 Jun 2020 23:27:17 GMT", server: "Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips mod_wsgi…", x-powered-by: "PHP/7.2.30", …}
                    request:ClientRequest {_events: Object, _eventsCount: 6, _maxListeners: undefined, …}
                    status:200 //axios response 
                    statusText:"OK" //axios response

                    #novaji response .data
                    errorcode:-4
                    message:"Amount cannot be less than 50"
                    status:"failed"

                    internal Error
                    
                    message:"Cannot read property 'indexOf' of null"
                    stack:"TypeError: Cannot read property 'indexOf' of null
                        at buildURL (c:\Users\HP\Documents\personal\code\Ahab-reactor\src\express.api\node_modules\axios\lib\helpers\buildURL.js:62:29)
                        at dispatchHttpRequest (c:\Users\HP\Documents\personal\code\Ahab-reactor\src\express.api\node_modules\axios\lib\adapters\http.js:84:13)
                        at new Promise (<anonymous>)
                        at httpAdapter (c:\Users\HP\Documents\personal\code\Ahab-reactor\src\express.api\node_modules\axios\lib\adapters\http.js:21:10)
                        at dispatchRequest (c:\Users\HP\Documents\personal\code\Ahab-reactor\src\express.api\node_modules\axios\lib\core\dispatchRequest.js:52:10)
                        at processTicksAndRejections (internal/process/task_queues.js:97:5)
                        at async Function.ExecuteGet (c:\Users\HP\Documents\personal\code\Ahab-reactor\src\express.api\bin\services\common\HTTPEngine.js:21:9)
                        at async Function.ExecuteGetWithUrl (c:\Users\HP\Documents\personal\code\Ahab-reactor\src\express.api\bin\services\BaseProcessor.js:34:16)
                        at async Function.ExecuteVTUAction ...

                */
                
                var v_response = {};
                if(d_response.status === 200){
                   v_response = d_response.data;
                   v_response.statuscode = v_response.status === "Success" ? 0 : d_response.data.errorcode;
                }else{
                    v_response = d_response;
                    //status: "failed", message: "Amount cannot be less than 50", errorcode: -4
                    v_response.status = "failed";
                    v_response.statuscode = 500;
                }
                response.message = vtuLog.StatusMessage = v_response.message;
                response.statuscode = vtuLog.ResponseCode = v_response.statuscode;
                response.status = vtuLog.Status = v_response.status;
                response.requestId = v_request.requestId;
                vtuLog.Ref = v_response.ref;
                vtuLog.IsSuccessful = v_response.statuscode === 0 ? true : false;
                vtuLog.ResponseMessage = v_response.message;
                await T.Update(vtuLog);
                response.Code = vtuLog.IsSuccessful? Responses.MessageResponse_SUCCESS.Code : Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = vtuLog.IsSuccessful ? `${Responses.MessageResponse_SUCCESS.Message} : ${vtuLog.ResponseMessage}` : `${Responses.MessageResponse_SYSTEM_MALFUNCTION.Message} : ${vtuLog.ResponseMessage}`;
            }
            catch (e)
            {
                response.Code = Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `${Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
            }
            return response;
    }
}
module.exports = {VTUProcessor};
