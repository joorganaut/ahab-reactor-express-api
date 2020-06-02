const BaseSystem = require('./BaseSystem');
const openpgp = require('openpgp');
class SecuritySystem extends BaseSystem{
    constructor(props){
        super(props);
        this.openpgp = openpgp;
    }
    static async Encrypt(word, institution){
        const { keys: [privateKey] } = await openpgp.key.readArmored(institution.DecryptionKey);
        await privateKey.decrypt(institution.PassPhrase);
        const { data: encrypted } = await openpgp.encrypt({
            message: openpgp.message.fromText(word),                 // input as Message object
            publicKeys: (await openpgp.key.readArmored(institution.EncryptionKey)).keys, // for encryption
            privateKeys: [privateKey]                                           // for signing (optional)
        });
        return this.Base64Encode(encrypted);
    }
    static async Decrypt(cipher, institution){
        const { keys: [privateKey] } = await openpgp.key.readArmored(institution.DecryptionKey);
        await privateKey.decrypt(institution.PassPhrase);
        const { data: decrypted } = await openpgp.decrypt({
            message: await openpgp.message.readArmored(this.Base64Decode(cipher)),              // parse armored message
            publicKeys: (await openpgp.key.readArmored(institution.DecryptionKey)).keys, // for verification (optional)
            privateKeys: [privateKey]                                           // for decryption
        });
        return decrypted;
    }
    static Base64Encode(cipher){
        let result = BaseSystem.Empty();
        result = Buffer.from(cipher).toString('base64');
        return result;
    }
    static Base64Decode(cipher){
        let result = BaseSystem.Empty();
        result = Buffer.from(cipher, 'base64').toString('ascii');
        return result;
    }
    static async GenerateKeys(institution){
        const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
            userIds: [
                { 
                    name: institution.ShortName, 
                    email: institution.ContactEmail 
                }
            ], // you can pass multiple user IDs
            curve: 'p256',                                           // ECC curve name
            passphrase: institution.PassPhrase          // protects the private key
        });
        institution.EncryptionKey = publicKeyArmored;
        institution.DecryptionKey = privateKeyArmored;
        return institution;
    }
}
module.exports = {SecuritySystem};