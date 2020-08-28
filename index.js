const EncryptionHelper = require('./EncryptionHelper');
let eh = new EncryptionHelper();
let envArr = ['test', 'test2'];
envArr.forEach(element => {
    if (process.env[element])
        process.env[element] = eh.decrypt(process.env[element]);
});
Object.keys(process.env).forEach(el => console.log(el, " = ", process.env[el]));