const bodyParser = require('body-parser');

//Routers
const apidocs = require('./apidocsRoute');
const pessoas = require('./pessoasRoute');
const niveis = require('./nivelRoute');
const turmas = require('./turmaRoute');


// StrategyAuth
const estrategiaAutenticacao = require('../utils/estrategias-autenticacao');


module.exports = app => {
    app.use(
        apidocs,
        bodyParser.json(),
        pessoas,
        niveis,
        turmas    
    );
}