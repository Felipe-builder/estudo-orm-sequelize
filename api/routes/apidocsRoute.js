// Routers
const { Router } = require('express')

// Documentations
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../swagger_output.json');

const router = Router()

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

module.exports = router;