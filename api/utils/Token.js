const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');

class Token {
    static criaTokenJWT(pessoa) {
        const payload = {
            id: pessoa.id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, {expiresIn: '15m'});                         
        return token;
    }

    static async criaTokenOpaco(pessoa){
        const tokenOpaco = crypto.randomBytes(24).toString('hex');
        const dataExpiracao = moment().add(5, 'd').unix(); 
        await allowlistRefreshToken.adiciona(tokenOpaco, pessoa.id, dataExpiracao);
        return tokenOpaco;
    }
}

module.exports = Token