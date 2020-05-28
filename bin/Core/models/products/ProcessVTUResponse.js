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
        super(props)
        this.status = props.status;
        this.message = props.message;
        this.statuscode = props.statuscode;
        this.requestId = props.requestId;
    }
}
module.exports = {ProcessVTUResponse}