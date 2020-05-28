class HTTPConfig{
    constructor(props){
        this.IP = props.IP;
        this.Route = props.Route;
        this.DataType = props.DataType;
        this.Method = props.Method;
        this.SOAPAction = props.SOAPAction;
        this.ApiConfigName = props.ApiConfigName;
        this.Headers = props.Headers;
        this.Parameters = props.Parameters;
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