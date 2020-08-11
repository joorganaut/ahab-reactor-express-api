const {SearchParameter} = require("./common/SearchParameter");

class ViewAllProductRequest extends SearchParameter{
    constructor(props){
        super(props);
        this.Name = props === undefined ? '' : props.Name;
        this.IsGLProduct = props === undefined ? '' : props.IsGLProduct;
    }
}
module.exports = {ViewAllProductRequest};