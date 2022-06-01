
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API - School of English",
        version: "1.0.0",
        description: "API - School of English for managing Teachers and Students and their respective courses.",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:3000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./api/routes/*.js", "./api/controllers*.js"],
};
  
module.exports = options;

// const swaggerSpec = swaggerJsDoc(options);

// function swaggerDocs(app, port) {
//     app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//     app.get('/swagger_output.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json')
//         res.send(swaggerSpec)
//     })
// }

// module.exports = swaggerDocs;