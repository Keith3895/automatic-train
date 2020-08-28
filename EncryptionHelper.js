require('dotenv').config();
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const {execSync} = require('child_process');
const keyIv = require(process.env.kEYIV);
const key = keyIv.key;
const iv = keyIv.iv;

module.exports = class crypt {

    constructor() {
    }
    /**
     * Method to encrypt the text param.
     * @param {String} text  value to encrypt
     * @param {String} tempKey ="key"
     * @param {String} tempIv ="iv"
     * @returns {String} encrypted text.
     */
    encrypt(text, tempKey = key, tempIv = iv) {
        try {
            let cipher = crypto.createCipheriv(algorithm, tempKey, tempIv);
            let encrypted = cipher.update(text);
             encrypted = Buffer.concat([encrypted, cipher.final()]);
            // return { iv: tempIv.toString('hex'), encryptedData: encrypted.toString('hex') };
            return encrypted.toString('hex');

        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Method to decrypt the text param
     * @param {String} text Value to Decrypt
     * @param {String} tempKey ='key'
     * @param {String} tempIv ='iv'
     */
    decrypt(text, tempKey = key, tempIv = iv) {
        try {
            // let encryptedText = Buffer.from(text);
            let decipher = crypto.createDecipheriv(algorithm, tempKey, tempIv);
            decipher.setAutoPadding(true);
            let decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted = decrypted + decipher.final('utf8');
            return decrypted;
        }
        catch (err) {
            throw err;
        }
    }

    decryptCmd(encText, tempKey = key, tempIv = iv){
        try{
            let cmd = execSync(`printf "${encText}" | openssl enc -aes-256-cbc  -d -a -K ${tempKey} -iv ${tempIv}`);
            return cmd.toString()
        }catch (e){
            throw err;
        }
    }
}