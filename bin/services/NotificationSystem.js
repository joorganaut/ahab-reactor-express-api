const BaseSystem = require('./BaseSystem');
const {
    Notification
} = require('../Core/data/Notification');
const {
    AddNotificationRequest
} = require('../Core/models/notification/AddNotificationRequest');
const {
    AddNotificationResponse
} = require('../Core/models/notification/AddNotificationResponse');
const {
    UpdateNotificationRequest
} = require('../Core/models/notification/UpdateNotificationRequest');
const {
    UpdateNotificationResponse
} = require('../Core/models/notification/UpdateNotificationResponse');
const {
    ViewAllNotificationRequest
} = require('../Core/models/notification/ViewAllNotificationRequest');
const {
    ViewAllNotificationResponse
} = require('../Core/models/notification/ViewAllNotificationResponse');
const {
    NotificationModel
} = require('../Core/models/data/NotificationModel');
const {
    Op, 
    Sequelize
} = require('sequelize');
const moment = require('moment');
class NotificationSystem extends BaseSystem {
    constructor(response, props) {
        super(props);
        this.props = props;
        this.response = response;
    }
    async ViewAllNotificationsAsync() {
        let response = new ViewAllNotificationResponse(this.response.Response);
        let request = new ViewAllNotificationRequest(this.response.req.query);
        if (this.response.Response.Code === '00') {
            response = await this.ViewAllNotifications(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ViewNotificationAsync() {
        let response = new ViewAllNotificationResponse(this.response.Response);
        let request = new ViewAllNotificationRequest(this.response.req.query);
        if (this.response.Response.Code === '00') {
            response = await this.Get(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ViewAllNotifications(request, response) {
        try {
            // if (request.Amount) {
            //     request.query = {
            //         Amount: {[Op.lte] : request.Amount}
            //     };
            // }
            let res = await this.RetrieveManyWithPaging(Notification, request);
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
    async AddNotificationAsync() {
        let response = new AddNotificationResponse(this.response.Response);
        let request = new AddNotificationRequest(this.response.req.body);
        console.log('this.is the first request::: ' + JSON.stringify(this.response.req.body));
        if (this.response.Response.Code === '00') {
            response = await this.AddNotification(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async UpdateNotificationAsync() {
        let response = new UpdateNotificationResponse(this.response.Response);
        let request = new UpdateNotificationRequest(this.response.req.body);
        console.log('this.is the first request::: ' + JSON.stringify(this.response.req.body));
        if (this.response.Response.Code === '00') {
            response = await this.UpdateNotification(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async UpdateNotification(request, response) {
        try {
            let model = new NotificationModel(request.Model);
            console.log('Request Model:::: ' + JSON.stringify(model));
            const id = parseInt(model.ID);
            let dbModel = {};
            await this.Get(Notification, id).then(res => {
                dbModel = res;
            });
            if (BaseSystem.IsNullOrUndefined(dbModel)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to retrieve Notification `;
                return response;
            }
            dbModel = this.ObjectProcessor.MapModelFromObject(dbModel, model);
            console.log('DB Model:::: ' + JSON.stringify(dbModel));
            let result = await this.Update(dbModel);
            console.log('Update result:::: ' + JSON.stringify(dbModel));
            if (BaseSystem.IsNullOrUndefined(result)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to update Notification details`;
                return response;
            }
        } catch (e) {
            console.log('Exception:::: ' + e);
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}`;
        }
        return response;
    }
    async AddNotification(request, response) {
        try {
            let model = new NotificationModel(request.Model);
            
            let result = await this.Save(Notification, model);
            if (BaseSystem.IsNullOrUndefined(result)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to create institution details`;
                return response;
            }
        } catch (e) {
            console.log('Exception:::: ' + e);
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e}`;
        }
        return response;
    }
    async GetNotification(request, response) {
        try {
            let model = new NotificationModel(request.Model);
            console.log('Request Model:::: ' + JSON.stringify(model));
            const id = parseInt(model.ID);
            let dbModel = {};
            await this.Get(Notification, id).then(res => {
                dbModel = res;
            });
            if (BaseSystem.IsNullOrUndefined(dbModel)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to retrieve Notification `;
                return response;
            }
            dbModel = this.ObjectProcessor.MapModelFromObject(dbModel, model);
            console.log('DB Model:::: ' + JSON.stringify(dbModel));
            let result = await this.Update(dbModel);
            console.log('Update result:::: ' + JSON.stringify(dbModel));
            if (BaseSystem.IsNullOrUndefined(result)) {
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = `Unable to update Notification details`;
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
    NotificationSystem
};