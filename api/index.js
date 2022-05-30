require('dotenv').config()

const express = require('express')
const routes = require('./routes')
require('../redis/blocklist-access-token');
require('../redis/allowlist-refresh-token');

const app = express()
const port = 3000

routes(app)

app.listen(process.env.PORT, () => console.log(`Servidor está rodando na porta ${process.env.PORT}`))

module.exports = app