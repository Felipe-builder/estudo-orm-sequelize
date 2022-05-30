const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PessoasServices = require('../services/PessoasServices')
const pessoaServices = new PessoasServices();
const { InvalidArgumentError } = require('./errors');
const blocklist = require('../../redis/blocklist-access-token')


function verificaPessoa(pessoa) {
    if (!pessoa) {
        throw new InvalidArgumentError('Não existe pessoa com esse email');
    }
}

async function verificaTokenNaBlocklist(token) {
    const tokenNaBlocklist = await blocklist.contemToken(token);
    if(tokenNaBlocklist) {
        throw new jwt.JsonWebTokenError('Token inválido por logout');
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
                await verificaTokenNaBlocklist(token)
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const pessoa = await pessoaServices.pegaUmRegistro({ id: payload.id });
                done(null, pessoa, { token: token });
            } catch (erro) {
                done(erro);
            }
        }
    )
)

module.exports = passport