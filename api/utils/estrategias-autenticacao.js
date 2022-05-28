const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PessoasServices = require('../services/PessoasServices')
const pessoaServices = new PessoasServices();
const { InvalidArgumentError } = require('./errors');
const blacklist = require('../../redis/manipula-blacklist')


function verificaPessoa(pessoa) {
    if (!pessoa) {
        throw new InvalidArgumentError('Não existe pessoa com esse email');
    }
}

async function verificaTokenNaBlacklist(token) {
    const tokenNaBlacklist = await blacklist.contemToken(token);
    if(tokenNaBlacklist) {
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
                await verificaTokenNaBlacklist(token)
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                console.log(payload)
                const pessoa = await pessoaServices.pegaUmRegistro({ id: payload.id });
                done(null, pessoa, { token: token });
            } catch (erro) {
                done(erro);
            }
        }
    )
)

module.exports = passport