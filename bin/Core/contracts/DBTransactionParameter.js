class DBTransactionParameter{
    constructor(props){
        this.DBAction = props === undefined ? '' :  props.DBAction;
        this.Action = props === undefined ? ()=>{}:  props.Action;
        this.DBObject = props === undefined ? {} :  props.DBObject;
        this.DBObjectType = props === undefined ? {} :  props.DBObjectType;
    }
}
module.exports = {DBTransactionParameter};
/*public DBAction DBAction { get; set ; }
        public object DBObject { get; set; }
        public Action Action { get; set; }
*/