/*/* public virtual string ImageString { get => ImageBytes != null ? Convert.ToBase64String(ImageBytes) : string.Empty; set { ImageString = value; } }
        public virtual long ImageEntityID { get => Obj != null ? Obj.ID : 0; set { ImageEntityID = value; } }

        public virtual string ImageEntity { get => Obj != null ? Obj.GetType().Name : string.Empty; set { ImageEntity = value; } }
*/
const {BaseModel} = require('../../contracts/BaseModel');
class BusinessImageModel extends BaseModel{
    constructor(props){
        super(props);
        this.ImageString = props === undefined ? '' :  props.ImageString;
        this.ImageEntityID = props === undefined ? 0 :  props.ImageEntityID;
        this.ImageEntity = props === undefined ? '' :  props.ImageEntity;
    }
    static Base64Encode(cipher){
        let result = '';
        result = Buffer.from(cipher).toString('base64');
        return result;
    }
    static Base64Decode(cipher){
        let result = '';
        result = Buffer.from(cipher, 'base64').toString('ascii');
        return result;
    }
}
module.exports = {BusinessImageModel};