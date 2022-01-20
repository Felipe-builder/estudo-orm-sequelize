const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
const niveis = require('./nivelRoute')
const turmas = require('./turmaRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas,
        niveis,
        turmas    
    )
    
}