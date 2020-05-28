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
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return date+time
        }else{
            var today = new Date();
            var date = today.getFullYear()+(today.getMonth()+1)+today.getDate();
            var time = today.getHours()+today.getMinutes() + today.getSeconds();
            return date+time
        }        
    }
}
module.exports = BaseProcessor