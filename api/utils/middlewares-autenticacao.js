const passport = require('passport');

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');

const { InvalidArgumentError } = require('./errors');


async function verificaRefreshToken(refreshToken) {
    if (!refreshToken) {
        throw new InvalidArgumentError('Refresh não enviado!');
    }
    const id = await allowlistRefreshToken.buscaValor(refreshToken);
    if (!id) {
        throw new InvalidArgumentError('Refresh token inválido!');
    }
    return id;
}

async function invalidaRefreshToken(refreshToken){
    allowlistRefreshToken.deleta(refreshToken);
}


module.exports = {
    local: (req, res, next) => { 
        passport.authenticate(
            'local',
            { session: false },
            (erro, pessoa, info) => {
                if (erro && erro.name === 'InvalidArgumentError'){
                    return res.status(401).json({erro: erro.message})
                }

                if (erro) {
                    return res.status(500).json({ erro: erro.message})
                }

                if(!pessoa) {
                    return res.status(401).json();
                } 

                req.user = pessoa;
                return next();
            }
        )(req, res, next);
    },
    
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            {session: false},
            (erro, pessoa, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({erro: erro.message})
                }

                if (erro && erro.name === 'TokenExpiredError') {
                    return res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt })
                }

                if (erro) {
                    return res.status(500).json({erro: erro.message})
                }

                if (!pessoa) {
                    return res.status(401).json();
                }

                req.token = info.token;
                req.user = pessoa;
                return next();
            }
        )(req, res, next);
    },

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const id = await verificaRefreshToken(refreshToken);
            await  invalidaRefreshToken(refreshToken);
            req.user = await pessoasServices.pegaUmRegistro({ id });
            return next();
        } catch(erro) {
            if(erro.name === 'InvalidArgumentError') {
                return res.status(401).json({erro: erro.message})
            }

            return res.status(500).json({erro: erro.message})
        }
    }
}