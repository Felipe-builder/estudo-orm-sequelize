const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./api/routes/*Route.js'];


const doc = {
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
    host: "localhost:3000",
    base: "/",
    servers: [
        {
            url: "http://localhost:3000",
            description: "My API Documentation",
        },
    ],
    apis: ["./api/routes/pessoasRoute.js",],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./api/index.js'); // Your express api project's root file where the server starts
});