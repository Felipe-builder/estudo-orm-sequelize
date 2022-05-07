const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const PessoasServices = require('../services/PessoasServices')
const pessoaServices = new PessoasServices();

const bcrypt = require('bcrypt');
const { InvalidArgumentError } = require('./errors');

function verificaPessoa(pessoa) {
    if (!pessoa) {
        throw new InvalidArgumentError('Não existe pessoa com esse email');
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = bcrypt.compare(senha, senhaHash)
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
            const pessoa = await pessoaServices.pegaUmRegistro({email}) 
            verificaPessoa(pessoa);
            await verificaSenha(senha, pessoa.senha);

            done(null, pessoa)
        } catch (error) {
            done(error);
        }
    })
)

module.exports = passport