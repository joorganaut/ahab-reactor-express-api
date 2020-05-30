/*
         * "status": "Success",
    "message": "Airtime purchase successful",
    "requestId": 2019122018131234
         * 
    "statuscode": -1
         */
/*
 public string status { get; set; }
        public string message { get; set; }
        public int statuscode { get; set; }
        public string requestId { get; set; }
*/
const BaseResponse = require('../../contracts/BaseResponse');
class ProcessVTUResponse extends BaseResponse{
    constructor(props){
        super(props);
        this.status =   props === undefined ? '' : props.status;
        this.message =   props === undefined ? '' : props.message;
        this.statuscode =   props === undefined ? '' : props.statuscode;
        this.requestId =   props === undefined ? '' : props.requestId;
    }
}
module.exports = {ProcessVTUResponse};