const HTTPEngine = require('./common/HTTPEngine');
class BaseProcessor {
    constructor() {

    }
    IsNullOrWhiteSpace(input) {
        if (typeof input === 'undefined' || input === null) return true;
        return input.replace(/\s/g, '').length < 1;
    };
    IsNullOrUndefined(input){
        if (typeof input === 'undefined' || input === null) return true;
    }
    static async ExecuteGetWithUrl(httpConfig, request, error){
        return await HTTPEngine.ExecuteGet(httpConfig, request, error);
    }
    static async ExecutePost(httpConfig, request){

    }
    static GetDateAndTime(concat)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return date+time;
        }else{
            let today = new Date();
            let date = today.getFullYear()+(today.getMonth()+1)+today.getDate();
            let time = today.getHours()+today.getMinutes() + today.getSeconds();
            return date+time;
        }        
    }
    static GetTime(concat)
    {
        if(concat){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return time;
        }else{
            let today = new Date();
            let time = today.getHours()+today.getMinutes() + today.getSeconds();
            return time;
        }        
    }
    static GetDate(concat)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            return date;
        }else{
            let today = new Date();
            let date = today.getFullYear()+(today.getMonth()+1)+today.getDate();
            return date;
        }        
    }
}
module.exports = BaseProcessor;