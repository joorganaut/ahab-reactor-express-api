const {USSDRequest} = require('../Core/models/gateways/USSDRequest');
const {USSDResponse} = require('../Core/models/gateways/USSDResponse');
const {ProcessPinRequest} = require('../Core/models/products/ProcessPinRequest');
const {USSDMenu} = require('../Core/models/gateways/USSDMenu');
const {MenuModel} = require('../Core/models/gateways/MenuModel');
const Responses = require('./common/Responses');
 const USSDCommand = require('../services/common/USSDCommand');
 const PinProcessor = require('../services/PinProcessor');
class USSDProcessorServer {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.session = this.req.session;
        //this.session.CardMenu = 
    }
    async ProcessRequest() {
        let response = new USSDResponse({Error : ''});
        try {
            let trimmed = JSON.stringify(this.req.body).trim();
            let body = Object.keys(this.req.body)[0];
            let request = new USSDRequest(JSON.parse(body));
            console.log(JSON.parse(body));
            if (request.content === null || request.content === undefined || request.content === '' || request.content === "*372*2#") {
                response.content = "Invalid PIN. Please dial *372*2*PIN# to recharge";
                response.msisdn = request.msisdn;
                response.command = USSDCommand.End.name;
                response.src = request.src;
                response.Code = "EP";
                response.Message = "Empty Pin";
            }
            else{
                var responseString = request.command === 'begin' 
                ? await this.ExecuteUSSDAction(request) 
                : await this.ExecuteUSSDMenuAction(request);
                if (responseString.Code == "00") {
                    response.content =  responseString.content;//"Your airtime recharge was successful, Enjoy unlimited airtime, just dial *372*2#";
                } else if (responseString.Code == "94") {
                    response.content =  "This recharge pin has been used before, Enjoy unlimited airtime, just dial *372*2#";
                } else if (responseString.Code == "EP") {
                    response.Code = responseString.Message;
                    response.Message = responseString.Code;
                } else {
                    response.content =  `Your airtime recharge failed ${response.Message}, Enjoy unlimited airtime, just dial *372*2#`;
                }
                response.msisdn = request.msisdn;
                response.command = USSDCommand.Continue.name;
                response.src = request.src;
                response.Code = responseString.Code;
                response.Message = responseString.Message;
            }
            
        } catch (e) {
            response.Code = response.content = Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}: ${this.req.body}`;
        }
        console.log(response.ToString());
        this.res.send(response.ToString());
    }
    async ExecuteUSSDMenuAction(request){
        let option = request.content.split('*');
        let menu = this.req.session.Menu;
        let selectedOptions = this.req.session.SelectedOptions;
        var processPinRequest = new ProcessPinRequest({
            MSISDN : request.msisdn,
            Pin : option[3].replace("#", ""),
            Network : request.src
        });
        menu.SelectedPage = processPinRequest.Pin;
        menu = USSDMenu.get().filter(x=>x.PageNumber === menu.NextPageNumber)[0];
        menu.Phonenumber = processPinRequest.MSISDN;
        selectOptions.push(menu);
        this.session.SelectedOptions = selectOptions;
        return result;
    }
    async ExecuteUSSDAction(request){
        let result = new USSDResponse({Error : ''});
        let pin = request.content.split('*');
        if (pin.length < 3) {
            result.content = "Invalid PIN. Please dial *372*2*PIN# to recharge";
            result.Code = "EP";
            result.Message = "Empty Pin";
            return result;
        } else {
            var processPinRequest = new ProcessPinRequest({
                MSISDN : request.msisdn,
                Pin : pin[3].replace("#", ""),
                Network : request.src
            });
            //lets retrieve a ussd menu
            if(processPinRequest.Pin.length < 16 && processPinRequest.Pin === '75'){
                let menu = this.session.Menu;
                let selectOptions = [];
                menu = USSDMenu.get().filter(x=>x.PageNumber === 1)[0];
                menu.Phonenumber = processPinRequest.MSISDN;
                result.content = menu.Content;
                result.command = menu.Command;
                result.Code = "00";
                result.Message = "Successful";
                this.session.Menu = menu;
                selectOptions.push(menu);
                this.session.SelectedOptions = selectOptions;
                return result;
            }
            var p_response = await new PinProcessor().Execute(processPinRequest);
            result.Code = p_response.ResponseCode;
            result.Message = p_response.Code == '00'? "Your airtime recharge was successful, Enjoy unlimited airtime, just dial *372*2#": p_response.ResponseMessage;
        }
        return result;
    }
}
module.exports = {USSDProcessorServer};