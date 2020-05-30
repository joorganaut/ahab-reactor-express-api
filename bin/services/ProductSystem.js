const BaseSystem = require('./BaseSystem');
const {Product} = require('../Core/data/Product');
class ProductSystem extends BaseSystem{
    constructor(response, props) {
        super(props);
        this.response = response;
    }
}
module.exports = {ProductSystem};