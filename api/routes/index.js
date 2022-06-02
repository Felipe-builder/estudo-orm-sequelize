const pessoas = require('./pessoasRoute');
const niveis = require('./nivelRoute');
const turmas = require('./turmaRoute');
const estrategiaAutenticacao = require('../utils/estrategias-autenticacao');


module.exports = app => {
    app.use(
        pessoas,
        niveis,
        turmas    
    );
}