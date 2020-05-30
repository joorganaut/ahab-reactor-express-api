const {Customer} = require('../Core/data/Customer');
const BaseSystem = require('./BaseSystem');
class CustomerSystem extends BaseSystem{
    constructor(response, props) {
        super(props);
        this.response = response;
        this.error = '';
    }
}
module.exports = {CustomerSystem};