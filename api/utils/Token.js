const jwt = require('jsonwebtoken')

class Token {
    static criaTokenJWT(pessoa) {
        const payload = {
            id: pessoa.id
        }
        console.log(process.env.CHAVE_JWT)
        const token = jwt.sign(payload, process.env.CHAVE_JWT)
        return token
    }
}

module.exports = Token