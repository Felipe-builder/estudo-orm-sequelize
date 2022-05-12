const jwt = require('jsonwebtoken')

class Token {
    static criaTokenJWT(pessoa) {
        const payload = {
            id: pessoa.id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
        return token
    }
}

module.exports = Token