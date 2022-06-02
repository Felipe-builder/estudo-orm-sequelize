const crypto = require('crypto');
const moment = require('moment');

const Token = require("./Token");

const { InvalidArgumentError } = require('../../utils/errors');

const allowlistRefreshToken = require('../../../redis/allowlist-refresh-token');


class TokenOpaco extends Token {
    constructor() {
        super('refresh token', [5, 'd'])
    }        

    async criaTokenOpaco(id){
        const token = crypto.randomBytes(24).toString('hex');
        const dataExpiracao = moment().add(this.expiracao[0], this.expiracao[1]).unix(); 
        await allowlistRefreshToken.adiciona(token, id, dataExpiracao);
        return token;
    }


    async verificaTokenOpaco(token) {
        this.verificaTokenEnviado(token);
        const id = await allowlistRefreshToken.buscaValor(token);
        this.verificaTokenValido(id);
        return id;
    }

    verificaTokenValido(id) {
        if (!id) {
            throw new InvalidArgumentError(`${this.nome} inválido!`);
        }
    }

    verificaTokenEnviado(token) {
        if (!token) {
            throw new InvalidArgumentError(`${this.nome} não enviado!`);
        }
    }

    async invalidaTokenOpaco(token){
        await allowlistRefreshToken.deleta(token);
    }
}

module.exports = TokenOpaco;