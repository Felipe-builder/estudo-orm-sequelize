const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');

const PessoasServices = require('../services/PessoasServices')
const { AccessToken } = require('../models/tokens')
const { InvalidArgumentError } = require('./errors');

const pessoaServices = new PessoasServices();
const accessToken = new AccessToken('acess token', [15, 'm']);

function verificaPessoa(pessoa) {
    if (!pessoa) {
        throw new InvalidArgumentError('Não existe pessoa com esse email');
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if(!senhaValida) {
        throw new InvalidArgumentError('E-mail ou senha inválidos')
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const pessoa = await pessoaServices.pegaUmRegistro({email: email}) 
            verificaPessoa(pessoa);
            await verificaSenha(senha, pessoa.senha);

            done(null, pessoa)
        } catch (error) {
            done(error);
        }
    })
)


passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const id = await accessToken.verificaTokenJWT(token);
                const pessoa = await pessoaServices.pegaUmRegistro({ id });
                done(null, pessoa, { token: token });
            } catch (erro) {
                done(erro);
            }
        }
    )
)

module.exports = passport