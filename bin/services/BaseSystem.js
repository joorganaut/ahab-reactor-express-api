const Responses = require('./common/Responses');
const T = require('../DAO/BusinessObjectDAO');
const {sequelize} = require('../Core/BusinessObject');
const BaseProcessor = require('./BaseProcessor');
const {DBTransactionParameter} = require('../Core/contracts/DBTransactionParameter');
const DBAction = require('../Core/enums/DBAction');
const UtilitySystem = require('./common/UtilitySystem');
class BaseSystem extends BaseProcessor{
    constructor(props){
        super(props);
        this.Institution = props !== undefined?props.Institution : {};
        this.Responses = Responses;
        this.T = T;
        this.Sequelize = sequelize;
        this.BaseProcessor = BaseProcessor;
        this.UtilitySystem = UtilitySystem;
        this.DBAction = DBAction;
        this.Error = '';
    }
    async Execute(params){
        
        var retValue = null;
        
        return retValue;
    }
    async RetrieveByParameter(model, params){
        let obj = await this.T.FindOne(model, params);
        return obj;
    }
    async Get(model, id){
        let obj = await this.T.Get(model, id);
        return obj;
    }
    async Update(model, transaction){
        let obj = await this.T.Update(model, transaction);
        return obj;
    }
    async Save(model, params, transaction){
        let obj = await this.T.Save(model, params, transaction);
        return obj;
    }
    async RetrieveMany(model, params){
        let objs = await this.T.GetAllByNoPaging(model, params);
        return objs;
    }
    async RetrieveManyWithPaging(model, params){
        let count = 0;
        let objs = await this.T.GetAllBy(model, params, count);
        return objs;
    }
}
module.exports = BaseSystem;