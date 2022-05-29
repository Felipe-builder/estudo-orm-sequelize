const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

class Token {
    static criaTokenJWT(pessoa) {
        const payload = {
            id: pessoa.id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, {expiresIn: '15s'});                         
        return token;
    }

    static criaTokenOpaco(usuario){
        const tokenOpaco = crypto.randomBytes(24).toString('hex');
        const dataExpiracao = moment().add(5, 'd').unix(); 
        return tokenOpaco;
    }
}

module.exports = Token