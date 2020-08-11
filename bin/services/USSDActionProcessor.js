const BaseSystem = require('./BaseSystem');
class USSDActionProcessor extends BaseSystem{
    static EncryptPAN(pan, phoneNumber, callback){
        callback("hello");
        return "Hello";
    }
    static EncryptExpiry(expiry, phoneNumber, callback){
        callback("world");
        return "World";
    }
}
module.exports = {USSDActionProcessor};