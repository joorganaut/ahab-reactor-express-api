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
const {BaseModel} = require('../../contracts/BaseModel')
class CustomerModel extends BaseModel{
    constructor(props){
        super(props)
        this.FirstName = props.FirstName;
        this.LastName = props.LastName;
        this.OtherName = props.OtherName;
        this.PhoneNumber = props.PhoneNumber;
        this.Email = props.Email;
        this.Gender = props.Gender;
        this.DateOfBirth = props.DateOfBirth;
        this.BVN = props.BVN;
        this.Address = props.Address;
    }
} 
module.exports = {CustomerModel}