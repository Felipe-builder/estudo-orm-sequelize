const passport = require('passport')

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
                    console.log('erro')
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
    }
}