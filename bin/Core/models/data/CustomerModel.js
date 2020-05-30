/*
   public string FirstName { get; set; }
        public string LastName { get; set; }
        public string OtherName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string BVN { get; set; }
        public AddressModel Address { get; set; }
*/
const {BaseModel} = require('../../contracts/BaseModel');
const {AddressModel} = require('./AddressModel');
class CustomerModel extends BaseModel{
    constructor(props){
        super(props);
        this.FirstName = props === undefined ? '' :  props.FirstName;
        this.LastName = props === undefined ? '' :  props.LastName;
        this.OtherName = props === undefined ? '' :  props.OtherName;
        this.PhoneNumber = props === undefined ? '' :  props.PhoneNumber;
        this.Email = props === undefined ? '' :  props.Email;
        this.Gender = props === undefined ? 0 :  props.Gender;
        this.DateOfBirth = props === undefined ? '' :  props.DateOfBirth;
        this.BVN = props === undefined ? '' :  props.BVN;
        this.Address = props === undefined ? new AddressModel() :  props.Address;
    }
} 
module.exports = {CustomerModel}