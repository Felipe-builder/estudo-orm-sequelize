const passport = require('passport');

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

const { TokenOpaco, AccessToken } = require('../models/tokens');
const tokenOpaco = new TokenOpaco();
const emailToken = new AccessToken('token de verificação de e-mail', [1, 'h']);


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
            const id = await tokenOpaco.verificaTokenOpaco(refreshToken);
            await tokenOpaco.invalidaTokenOpaco(refreshToken);
            req.user = await pessoasServices.pegaUmRegistro({ id });
            return next();
        } catch(erro) {
            if(erro.name === 'InvalidArgumentError') {
                return res.status(401).json({erro: erro.message})
            }

            return res.status(500).json({erro: erro.message})
        }
    },

    async verificacaoEmail(req, res, next) {
        try {
            const { token } = req.params;
            const id = await emailToken.verificaTokenJWT(token);
            const pessoa = await pessoasServices.pegaUmRegistro({id});
            req.user = pessoa;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({error: error.message});
            }

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: error.message, expiradoEm: error.expiredAt
                })
            }

            return res.status(500).json({erro: erro.message})
        }

    }
}