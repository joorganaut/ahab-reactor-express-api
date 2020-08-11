const BaseSystem = require('./BaseSystem');
const {Product} = require('../Core/data/Product');
const {AddProductRequest} = require('../Core/models/CoreBanking/AddProductRequest');
const {AddProductResponse} = require('../Core/models/CoreBanking/AddProductResponse');
const {ViewAllProductRequest} = require('../Core/models/CoreBanking/ViewAllProductRequest');
const {ViewAllProductResponse} = require('../Core/models/CoreBanking/ViewAllProductResponse');
class ProductSystem extends BaseSystem{
    constructor(response, props) {
        super(props);
        this.props = props;
        this.response = response;
    }
    async ViewAllProductsAsync(){
        let response = new ViewAllProductResponse(this.response.Response);
        let request = new ViewAllProductRequest(this.response.req.body);
        if(this.response.Response.Code === '00'){
            response = await this.ViewAllProducts(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async ViewAllProducts(request, response){
        //let res = await this.RetrieveManyWithPaging()
        return response;
    }
    async AddProductAsync(){
        let response = new AddProductResponse(this.response.Response);
        let request = new AddProductRequest(this.response.req.body);
        if(this.response.Response.Code === '00'){
            response = await this.AddProduct(request, response);
        }
        this.response.res.send(response.ToString());
    }
    async AddProduct(request, response){
        return response;
    }
}
module.exports = {ProductSystem};