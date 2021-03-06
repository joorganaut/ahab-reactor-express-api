const Responses = require('../services/common/Responses');
const {BusinessObject} = require('../Core/BusinessObject');

addInputParameter = (params, paramName, value) => {
    if (params == null) {
        params = {};
    }
    params[paramName] = value;
    return params[paramName];
};
Get = async (T, id) => {
    let result = {};
    try {
        await T.findByPk(id)
            .then(usr => {
                if (usr !== null) {
                    result = usr;
                } else {
                    throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Not a valid ID';
                }
            }).error(err => {
                throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
            });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
GetAll = async (T, params) => {
    var result = {};        
    try {
        console.log('i go the hell here Get All records');
        await T.findAll({
            limit: params.pageSize,
            offset: params.page * params.pageSize,
            order: [
                [params.sort, params.dir]
            ],
        }).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
GetAllNoPaging = async (T) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records');
        await T.findAll().then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
GetAll = async (T, params, count) => {
    var result = {};
    try {        
        console.log('i go the hell here Get All records');
        await T.findAndCountAll({
            limit: params.pageSize,
            offset: params.page * params.pageSize,
            order: [
                [params.sort, params.dir]
            ],
        }).then(count, rows => {
            if (rows !== null) {
                result = rows;
                count = count;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return {result, count};
};

GetAllBy = async (T, params) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.findAll({
            where: params.query,
            limit: params.pagingParams.pageSize,
            offset: params.pagingParams.page * params.pagingParams.pageSize,
            order: [
                [params.pagingParams.sort, params.pagingParams.dir]
            ],
        }).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
GetAllByWithCallback = async (T, params, callback) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.findAndCountAll({
            where: params.query,
            limit: params.pagingParams.pageSize,
            offset: params.pagingParams.page * params.pagingParams.pageSize,
            order: [
                [params.pagingParams.sort, params.pagingParams.dir]
            ],
        }).then(res => {
            if (res !== null) {
                result = res.rows;
                count = res.count;
                callback({result, count});
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return {result, count};
};
GetAllByNoPagingNoWhere = async (T, params) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.findAll(params).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        console.log(error.message);
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};

GetAllByNoPagingNoWhereWithCallback = async (T, params, callback) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.findAll(params).then(async rows => {
            if (rows !== null) {
                result = rows;
                await callback(rows);
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        console.log(error.message);
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
GetAllByNoPaging = async (T, params) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.findAll({
            where : params
        }).then(rows => {
            if (rows !== null) {
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        console.log(error.message);
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
GetAllBy = async (T, params, count) => {
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.findAndCountAll({
            where: params.query,
            limit: params.pagingParams.pageSize,
            offset: params.pagingParams.page * params.pagingParams.pageSize,
            order: [
                [params.pagingParams.sort, params.pagingParams.dir]
            ],
        }).then(res => {
            if (res !== null) {
                result = res.rows;
                count = res.count;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return {result, count};
};
Save = async (T, params, transaction) => {    
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.create(params, transaction).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to save record';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
Update = async (params, transaction) => {    
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await params.save(transaction).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to update record';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
Delete = async(params)=>{
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        await T.destroy(params).then(rows => {
            if (rows !== null) {
                console.log(JSON.stringify(rows));
                result = rows;
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Unable to delete record';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
FindOne = async (T, params) => {
    let result = {};
    try {
        await T.findOne({where : params})
            .then(usr => {
                if (usr !== null) {
                    result = usr;
                } else {
                    throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': Not a valid ID';
                }
            }).error(err => {
                throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
            });
    } catch (error) {
        return null;
    }
    return result;
};
Query = async(T, params)=>{
    var result = {};
    try {
        console.log('i go the hell here Get All records: ' + params);
        const model = T.name.substring(0, T.name.length - 1);
        await T.sequelize.query({
            query: params.query,
            // model: model,
            // mapToModel: true,
            type: T.sequelize.QueryTypes.SELECT,
        }).then(res => {
            if (res !== null) {
                result = res[0];
            } else {
                throw Responses.MessageResponse_TRANSACTION_INVALID.Message + ': they are no records';
            }
        }).error(err => {
            throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + err.Message;
        });
    } catch (error) {
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
ExecuteTransactions = async(transactions)=>{
    let result = {};
    let {sequelize} = require('../Core/BusinessObject');
    try{
    result = await sequelize.transaction().then(async(t)=>{
        if(transactions.length > 0){
            let dbObject = {};
            transactions.forEach(async element =>  {
                await element.Action(dbObject).then(async x=>{
                    if(element.DBAction === 'Save'){
                        await element.DBObjectType.create(element.DBObject, { transaction: t }).then(res=>{
                            dbObject = res;
                        });
                    }
                    if(element.DBAction === 'Update'){
                         await element.DBObjectType.update(element.DBObject, { transaction: t });
                    }
                }
                );
                
            });
            return dbObject;
        }
    });
    }catch(error){
        throw Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + ' ' + error.message;
    }
    return result;
};
module.exports = {
    GetAll,
    GetAllNoPaging,
    GetAllBy,
    GetAllByNoPaging,
    GetAllByNoPagingNoWhere,
    GetAllByNoPagingNoWhereWithCallback,
    GetAllByWithCallback,
    Get,
    Save,
    Update,
    Delete,
    FindOne,
    Query,
    addInputParameter,
    ExecuteTransactions
};