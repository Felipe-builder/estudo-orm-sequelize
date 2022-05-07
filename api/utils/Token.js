const jwt = require('jsonwebtoken')

class Token {
    static criaTokenJWT(pessoa) {
        const payload = {
            id: pessoa.id
        }

        const token = jwt.sign(payload, 'senha-secreta')
        return token
    }
}

module.exports = Token