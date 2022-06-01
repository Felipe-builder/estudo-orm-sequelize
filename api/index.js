require('dotenv').config()


//Express and Body-parser
const bodyParser = require('body-parser');
const express = require('express')

//Documentations
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
// const swaggerDocs = require('../swaggerDocs');

//Router
const routes = require('./routes')

//Redis's List
require('../redis/blocklist-access-token');
require('../redis/allowlist-refresh-token');


//Initialization
const app = express();

routes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));
app.use(bodyParser.json());


app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`)
    // swaggerDocs(app, process.env.PORT)
})

module.exports = app