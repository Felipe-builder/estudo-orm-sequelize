const fs = require('fs');
const { generateKeyPair } = require('crypto');

const senha = process.env.CHAVE_JWT

generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: senha
    }
}, (erro, chavePublica, chavePrivada) => {
    fs.writeFileSync('public.pem', chavePublica);
    fs.writeFileSync('private.key', chavePrivada);
})