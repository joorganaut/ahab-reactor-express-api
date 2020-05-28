const Responses = require('./common/Responses');
const T = require('../DAO/BusinessObjectDAO')
const TopUpMSISDNRequest = require('../Core/models/mobile/TopUpMSISDNRequest').TopUpMSISDNRequest;
const TopUpMSISDNResponse = require('../Core/models/mobile/TopUpMSISDNResponse').TopUpMSISDNResponse;
const ValidateUserPinRequest = require('../Core/models/mobile/ValidateUserPinRequest').ValidateUserPinRequest;
const ValidateUserPinResponse = require('../Core/models/mobile/ValidateUserPinResponse').ValidateUserPinResponse;
const FundVTUWalletRequest = require('../Core/models/mobile/FundVTUWalletRequest').FundVTUWalletRequest;
const FundVTUWalletResponse = require('../Core/models/mobile/FundVTUWalletResponse').FundVTUWalletResponse;
class VTUSystem{
    constructor(response){
        this.response = response;
    }
    TopUpMSISDN =async()=>{
        let request = new TopUpMSISDNRequest(this.response.req.body);
        let response = new TopUpMSISDNResponse(this.response.Response);
        if(response.Code === '00')
        {
            //Perform actual top-up
        }
        this.response.res.send(response.ToString())
    }
    ValidateTransactionPin=async()=>{
        let request = new ValidateUserPinRequest(this.response.req.body);
        let response = new ValidateUserPinResponse();
        this.response.res.send(response.ToString())
    }
    FundVTUWallet=async()=>{
        let request = new FundVTUWalletRequest(this.response.req.body);
        let response = new FundVTUWalletResponse();
        this.response.res.send(response.ToString())
    }
}
module.exports = {VTUSystem}