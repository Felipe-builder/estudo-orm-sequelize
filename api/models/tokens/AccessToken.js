const jwt = require('jsonwebtoken');

const Token = require("./Token");

const blocklist = require('../../../redis/blocklist-access-token');
const blocklistAccessToken = require('../../../redis/blocklist-access-token')


class AccessToken extends Token {

    constructor() {
        super('acess token', [15, 'm'])
    }

    criaTokenJWT(id) {
        const payload = { id };
        const token = jwt.sign(payload, process.env.CHAVE_JWT, {expiresIn: this.expiracao.join('')});                         
        return token;
    }

    async verificaTokenJWT(token) {
        await this.verificaTokenNaBlocklist(token)
        const { id } = jwt.verify(token, process.env.CHAVE_JWT);
        return id;
    }

    async verificaTokenNaBlocklist(token) {
        const tokenNaBlocklist = await blocklistAccessToken.contemToken(token);
        if(tokenNaBlocklist) {
            throw new jwt.JsonWebTokenError(`${this.nome} inválido por logout`);
        }
    }

    invalidaTokenJWT(token) {
        return blocklist.adiciona(token);
    }
}

module.exports = AccessToken;