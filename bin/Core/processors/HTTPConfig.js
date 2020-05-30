class HTTPConfig{
    constructor(props){
        this.IP =   props === undefined ? '' : props.IP;
        this.Route =   props === undefined ? '' : props.Route;
        this.DataType =  props === undefined ? '' :  props.DataType;
        this.Method =  props === undefined ? '' :  props.Method;
        this.SOAPAction =   props === undefined ? '' : props.SOAPAction;
        this.ApiConfigName =  props === undefined ? '' :  props.ApiConfigName;
        this.Headers =   props === undefined ? [] : props.Headers;
        this.Parameters =   props === undefined ? '' : props.Parameters;
        this.Url = this.IP + this.Route;
    }
}
module.exports = {HTTPConfig}

/*
public string IP { get; set; }
        public string Route { get; set; }
        public string DataType { get; set; }
        public HTTPMethod Method { get; set; }
        public string SOAPAction { get; set; }
        public string ApiConfigName { get; set; }
        public KeyValuePair<string, string>[] Headers { get; set; }
        public KeyValuePair<string, string>[] Parameters { get; set; }
*/