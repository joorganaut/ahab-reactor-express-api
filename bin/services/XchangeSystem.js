const BaseSystem = require('./BaseSystem');
const {
    Exchange
} = require('../Core/data/Exchange');
const {
    AddXchangeRequest
} = require('../Core/models/products/xchange/AddXchangeRequest');
const {
    AddXchangeResponse
} = require('../Core/models/products/xchange/AddXchangeResponse');
const {
    UpdateXchangeRequest
} = require('../Core/models/products/xchange/UpdateXchangeRequest');
const {
    UpdateXchangeResponse
} = require('../Core/models/products/xchange/UpdateXchangeResponse');
const {
    ViewAllXchangeRequest
} = require('../Core/models/products/xchange/ViewAllXchangeRequest');
const {
    ViewAllXchangeResponse
} = require('../Core/models/products/xchange/ViewAllXchangeResponse');
const {
    XchangeModel
} = require('../Core/models/data/XchangeModel');
const {
    Op, 
    Sequelize
} = require('sequelize');
const moment = require('moment');
class XchangeSystem extends BaseSystem {
    constructor(response, props) {
        super(props);
        this.props = props;
        this.response = response;
    }
    async ViewAllXchangesAsync() {
        let response = new ViewAllXchangeResponse(this.response.Response);
        let request = new ViewAllXchangeRequest(this.response.req.query);
        if (this.response.Response.Code === '00') {
            response = await this.ViewAllXchanges(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ViewXchangeAsync() {
        let response = new ViewAllXchangeResponse(this.response.Response);
        let request = new ViewAllXchangeRequest(this.response.req.query);
        if (this.response.Response.Code === '00') {
            response = await this.Get(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ViewAllXchanges(request, response) {
        try {
            request.query = {};
            if (request.Amount) {
                request.query = {
                    Amount: {[Op.lte] : request.Amount}
                };
            }
            if(request.RequesterID){
                request.query.RequesterUserID =  parseInt(request.RequesterID);
            }
            let res = await this.RetrieveManyWithPaging(Exchange, request);
            response.Model = res.result;
            response.count = res.count;
            response.Code = this.Responses.MessageResponse_SUCCESS.Code;
            response.Message = this.Responses.MessageResponse_SUCCESS.Message;
        } catch (e) {
            console.log('Exception:::: ' + e);
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}`;
        }
        return response;
    }
    async AddXchangeAsync() {
        let response = new AddXchangeResponse(this.response.Response);
        let request = new AddXchangeRequest(this.response.req.body);
        console.log('this.is the first request::: ' + JSON.stringify(this.response.req.body));
        if (this.response.Response.Code === '00') {
            response = await this.AddXchange(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async UpdateXchangeAsync() {
        let response = new UpdateXchangeResponse(this.response.Response);
        let request = new UpdateXchangeRequest(this.response.req.body);
        console.log('this.is the first request::: ' + JSON.stringify(this.response.req.body));
        if (this.response.Response.Code === '00') {
            response = await this.UpdateXchange(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async GenerateRef(model) {
        let dateString = BaseSystem.GetDateAndTime();
        const tRef = `${model.FromCurrency}-${model.ToCurrency}-${model.RequesterUserID}-${dateString}`;
        return tRef;
    }
    async UpdateXchange(request, response) {
        try {
            let model = new XchangeModel(request.Model);
            console.log('Request Model:::: ' + JSON.stringify(model));
            const id = parseInt(model.ID);
            let dbModel = {};
            await this.Get(Exchange, id).then(res => {
                dbModel = res;
            });
            if (BaseSystem.IsNullOrUndefined(dbModel)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to retrieve Xchange `;
                return response;
            }
            dbModel = this.ObjectProcessor.MapModelFromObject(dbModel, model);
            console.log('DB Model:::: ' + JSON.stringify(dbModel));
            let result = await this.Update(dbModel);
            console.log('Update result:::: ' + JSON.stringify(dbModel));
            if (BaseSystem.IsNullOrUndefined(result)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to update Xchange details`;
                return response;
            }
        } catch (e) {
            console.log('Exception:::: ' + e);
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}`;
        }
        return response;
    }
    async AddXchange(request, response) {
        try {
            let model = new XchangeModel(request.Model);
            console.log('this is th request::: ' + JSON.stringify(request));
            if (model.Amount <= 0) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `Please provide an "Amount" greater than 0 `;
                return response;
            }
            if (model.Rate <= 0) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `Please provide a "Rate" greater than 0 `;
                return response;
            }
            let momentDate = moment(model.ExpiryDate).toDate();

            console.log(momentDate.toDateString() + ' - second date' + new Date().toDateString());
            if (momentDate.toDateString() === new Date().toDateString()) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `Please provide an "Expiry Date" greater than today `;
                return response;
            }
            if (BaseSystem.IsNullOrWhiteSpace(model.FromCurrency)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `Please select a 'Currency' you want to change 'From' `;
                return response;
            }
            if (BaseSystem.IsNullOrWhiteSpace(model.ToCurrency)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `Please select a 'Currency' you want to change 'To' `;
                return response;
            }
            if (model.FromCurrency === model.ToCurrency) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS.Code;
                response.Message = `"From" currency and "To" currency cannot be the same `;
                return response;
            }
            //Get User....
            //Generate Transaction Ref
            model.TransactionRef = await this.GenerateRef(model);
            model.DateCreated = new Date();
            model.DateLastModified = new Date();
            console.log('this is the model before saving ' + JSON.stringify(model));
            let result = await this.Save(Exchange, model);
            if (BaseSystem.IsNullOrUndefined(result)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to create institution details`;
                return response;
            }
            response.TransactionRef = result.TransactionRef;
        } catch (e) {
            console.log('Exception:::: ' + e);
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}`;
        }
        return response;
    }
    async GetXchange(request, response) {
        try {
            let model = new XchangeModel(request.Model);
            console.log('Request Model:::: ' + JSON.stringify(model));
            const id = parseInt(model.ID);
            let dbModel = {};
            await this.Get(Exchange, id).then(res => {
                dbModel = res;
            });
            if (BaseSystem.IsNullOrUndefined(dbModel)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to retrieve Xchange `;
                return response;
            }
            dbModel = this.ObjectProcessor.MapModelFromObject(dbModel, model);
            console.log('DB Model:::: ' + JSON.stringify(dbModel));
            let result = await this.Update(dbModel);
            console.log('Update result:::: ' + JSON.stringify(dbModel));
            if (BaseSystem.IsNullOrUndefined(result)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to update Xchange details`;
                return response;
            }
        } catch (e) {
            console.log('Exception:::: ' + e);
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}`;
        }
        return response;
    }
}
module.exports = {
    XchangeSystem
};