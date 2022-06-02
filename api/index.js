require('dotenv').config()


//Express and Body-parser
const express = require('express')

//Router
const routes = require('./routes')

//Redis's List
require('../redis/blocklist-access-token');
require('../redis/allowlist-refresh-token');


//Initialization
const app = express();

routes(app);


app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`)
})

module.exports = app