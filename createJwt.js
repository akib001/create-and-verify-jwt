const base64 = require('base64url');
const crypto = require('crypto');
const signatureFunction = crypto.createSign('RSA-SHA256');
const fs = require('fs');

const headerObj = {
    alg: 'RS256',
    typ: 'JWT'
};

const payloadObj = {
    sub: '1234567890',
    name: 'Md Azaz Ahmed',
    admin: true,
    iat: 1516239022
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64(headerObjString);
const base64UrlPayload = base64(payloadObjString);

signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
signatureFunction.end();

// The private key without line breaks
const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

// Will sign our data and return Base64 signature (not the same as Base64Url!)
const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');
const signatureBase64Url = base64.fromBase64(signatureBase64);

console.log(signatureBase64Url); 