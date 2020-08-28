#!/usr/bin/env node

const EncryptionHelper = require('./EncryptionHelper');
// console.log("the",process.argv);
let eh = new EncryptionHelper();

switch (process.argv[2]) {
    case 'encrypt':
    case '-e':
    case '--encrypt':
        if (process.argv[3] == '-m') {
            let keys = process.argv.slice(4);
            keys.forEach(element => {
                console.log(encrypt(element));
            });
        } else {
            console.log(encrypt(process.argv[3]));
        }
        break;
    case 'decrypt':
    case '-d':
    case '--decrypt':
        if (process.argv[3] == '-m') {
            let keys = process.argv.slice(4);
            keys.forEach(element => {
                console.log(decrypt(element));
            });
        } else {
            console.log(decrypt(process.argv[3]));
        }
        break;
    case '-h':
    case 'help':
    default:
    console.log(`
Usage:
    ./genKey --option <KEY/CYPHER>
    node genKey --option <KEY/CYPHER>
Options:
    encrypt -e --encrypt    encrypt the arguments and give a cypher text. [-m] to add multiple args
    decrypt -d --decrypt    decrypt the arguments and return a string. [-m] to add multiple args
    -h help                 Show this screen.
    `);
}




function encrypt(key){
    return `
################################# Encrypted Value for *** ${key} ***  #############################
            
            ${eh.encrypt(key)}
            
###################################################################################################
            `
};


function decrypt(key){
    return `
################################# Decrypted Value for *** ${key} ***  #############################
            
            ${eh.decrypt(key)}
            
###################################################################################################
            `
};

