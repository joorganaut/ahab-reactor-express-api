/*public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
*/
const {BaseModel} = require('../../contracts/BaseModel');
class AddressModel extends BaseModel{
    constructor(props){
        super(props);
        this.Street = props === undefined ? '' :  props.Street;
        this.City = props === undefined ? '' :  props.City;
        this.State = props === undefined ? '' :  props.State;
        this.Country = props === undefined ? '' :  props.Country;
    }
}
module.exports = {AddressModel}